import { NextResponse } from 'next/server';
import prisma from '~/lib/prisma';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

interface Article {
    id: string;
    title: string;
    description: string;
    publishDate: string;
    url: string;
    tags: string[];
    imageUrl: string;
    source: string;
}

// Вспомогательные функции для обработки статьи

function extractDate(item: any): string {
    return item.pubDate || item.date || item.updated || '';
}

function extractImageUrl(item: any): string {
    // media:content
    if (item['media:content'] && item['media:content']["@_url"]) {
        return item['media:content']["@_url"];
    }
    // media:thumbnail
    if (item['media:thumbnail'] && item['media:thumbnail']["@_url"]) {
        return item['media:thumbnail']["@_url"];
    }
    // enclosure с изображением
    if (item.enclosure && item.enclosure["@_type"] && item.enclosure["@_type"].startsWith('image') && item.enclosure["@_url"]) {
        return item.enclosure["@_url"];
    }
    // Поиск тега <img> в описании
    if (item.description && typeof item.description === 'string') {
        const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch && imgMatch[1]) {
            return imgMatch[1];
        }
    }
    return '';
}

function extractSource(item: any, feedUrl: string): string {
    try {
        const link = item.link || feedUrl;
        const url = new URL(typeof link === 'object' ? link : link.toString());
        return url.hostname.replace('www.', '');
    } catch {
        return 'Unknown';
    }
}

function removeImagesFromDescription(description: string): string {
    return description.replace(/<img[^>]+>/g, '');
}

export async function GET() {
    try {
        // Получаем все внешние источники из БД
        const feeds = await prisma.externalFeed.findMany();
        let allArticles: Article[] = [];
        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_",
        });

        // Для каждого источника пытаемся получить и распарсить RSS
        for (const feed of feeds) {
            try {
                const response = await axios.get(feed.feedUrl, { responseType: 'text' });
                const xmlData = response.data;

                if (!xmlData.includes('<rss') && !xmlData.includes('<feed')) {
                    continue;
                }

                const jsonObj = parser.parse(xmlData);
                let items: any[] = [];

                // Обработка RSS 2.0
                if (jsonObj.rss && jsonObj.rss.channel) {
                    const channel = jsonObj.rss.channel;
                    if (Array.isArray(channel.item)) {
                        items = channel.item;
                    } else if (channel.item) {
                        items = [channel.item];
                    }
                }
                // Обработка Atom
                else if (jsonObj.feed && jsonObj.feed.entry) {
                    if (Array.isArray(jsonObj.feed.entry)) {
                        items = jsonObj.feed.entry;
                    } else {
                        items = [jsonObj.feed.entry];
                    }
                } else {
                    continue;
                }

                // Преобразуем каждый элемент в статью
                const articles = items.map((item) => {
                    const title =
                        (item.title &&
                            (typeof item.title === 'object'
                                ? item.title['#text'] || item.title
                                : item.title)) ||
                        'Без заголовка';
                    const description = item.description || item.summary || '';
                    const publishDate = extractDate(item);
                    const link = item.link;
                    let articleUrl = '#';
                    if (typeof link === 'object') {
                        if (Array.isArray(link)) {
                            const alternate = link.find((l: any) => l["@_rel"] === 'alternate');
                            articleUrl = alternate ? alternate["@_href"] : link[0]["@_href"];
                        } else {
                            articleUrl = link["@_href"] || '#';
                        }
                    } else if (typeof link === 'string') {
                        articleUrl = link;
                    }
                    const id = item.guid || item.id || Math.random().toString(36).substr(2, 9);
                    const tags = item.category
                        ? Array.isArray(item.category)
                            ? item.category
                            : [item.category]
                        : [];
                    const imageUrl = extractImageUrl(item);
                    const source = extractSource(item, feed.feedUrl);

                    return {
                        id,
                        title,
                        description: imageUrl ? removeImagesFromDescription(description) : description,
                        publishDate,
                        url: articleUrl,
                        tags,
                        imageUrl,
                        source,
                    } as Article;
                });

                allArticles = allArticles.concat(articles);
            } catch (err) {
                console.error(`Ошибка получения/парсинга фида ${feed.feedUrl}:`, err);
                // При ошибке просто переходим к следующему источнику
            }
        }

        // Сортировка статей по дате (от новых к старым)
        allArticles.sort(
            (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );

        return NextResponse.json(allArticles);
    } catch (error) {
        console.error('Ошибка при агрегировании статей:', error);
        return NextResponse.json({ error: 'Ошибка при получении статей' }, { status: 500 });
    }
}
