import React from 'react';

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

interface ArticleCardProps {
    article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    return (
        <div className="card bg-base-100 shadow-md p-4">
            {article.imageUrl && (
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-48 object-cover mb-4"
                />
            )}
            <h2 className="text-xl font-semibold mb-2">
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    {article.title}
                </a>
            </h2>
            <p
                className="text-gray-700 mb-2"
                dangerouslySetInnerHTML={{ __html: article.description }}
            ></p>
            <p className="text-sm text-gray-500 mb-2">Источник: {article.source}</p>
            <p className="text-sm text-gray-500 mb-2">
                Опубликовано: {new Date(article.publishDate).toLocaleString()}
            </p>
            {article.tags.length > 0 && (
                <div className="mb-4">
                    {article.tags.map((tag, index) => (
                        <span key={index} className="badge badge-primary mr-1">
              {tag}
            </span>
                    ))}
                </div>
            )}
            <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
            >
                Перейти
            </a>
        </div>
    );
};

export default ArticleCard;
