'use client';

import React, { useState, useEffect } from 'react';
import ArticleCard from '@/app/components/ArticleCard';
import ExternalFeedManager from '@/app/components/ExternalFeedManager';

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

const RssFeedPage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetchArticles = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('/api/rss/external/feed');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setArticles(data);
        } catch (err) {
            console.error('Ошибка при получении RSS-фида:', err);
            setError('Не удалось загрузить RSS-фид.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleFeedsUpdated = () => {
        fetchArticles();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">RSS-фид</h1>
            <ExternalFeedManager onFeedsUpdated={handleFeedsUpdated} />
            {loading && <p className="text-center">Загрузка статей...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && articles.length === 0 && (
                <p className="text-center">Нет доступных статей.</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
};

export default RssFeedPage;
