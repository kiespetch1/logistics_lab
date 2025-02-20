'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { useSession } from 'next-auth/react';

interface Feed {
    id: number;
    feedUrl: string;
}

interface ExternalFeedManagerProps {
    onFeedsUpdated: () => void;
}

const ExternalFeedManager: React.FC<ExternalFeedManagerProps> = ({ onFeedsUpdated }) => {
    const { data: session } = useSession();
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [newFeedUrl, setNewFeedUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isFeedsVisible, setIsFeedsVisible] = useState<boolean>(false);

    useEffect(() => {
        fetchExternalFeeds();
    }, []);

    const fetchExternalFeeds = async () => {
        try {
            const response = await fetch('/api/rss/external');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: Feed[] = await response.json();

            const defaultFeed: Feed = { id: -1, feedUrl: 'https://logisticsinfo-lab.vercel.app/feed.xml' };

            const filteredFeeds = data.filter(
                (feed) => feed.feedUrl !== defaultFeed.feedUrl
            );

            setFeeds([defaultFeed, ...filteredFeeds]);
        } catch (err) {
            console.error('Ошибка при получении внешних источников:', err);
            setError('Не удалось загрузить внешние источники.');
        }
    };

    const handleAddFeed = async (e: FormEvent) => {
        e.preventDefault();
        if (!newFeedUrl.trim()) {
            setError('URL источника не может быть пустым.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await fetch('/api/rss/external', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ feedUrl: newFeedUrl }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Ошибка при добавлении источника.');
            }
            const addedFeed = await response.json();
            setFeeds([...feeds, addedFeed]);
            setNewFeedUrl('');
            onFeedsUpdated();
        } catch (err) {
            console.error('Ошибка при добавлении источника:', err);
            setError('Не удалось добавить источник. Проверьте URL.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteFeed = async (id: number) => {
        if (!window.confirm('Вы уверены, что хотите удалить этот источник?')) return;
        try {
            const response = await fetch(`/api/rss/external/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setFeeds(feeds.filter((feed) => feed.id !== id));
            onFeedsUpdated();
        } catch (err) {
            console.error('Ошибка при удалении источника:', err);
            setError('Не удалось удалить источник.');
        }
    };

    return (
        <div className="card bg-base-100 shadow-md p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Управление внешними источниками</h3>
            {session ? (
                <form
                    onSubmit={handleAddFeed}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4"
                >
                    <input
                        type="url"
                        placeholder="Введите URL RSS-источника"
                        value={newFeedUrl}
                        onChange={(e) => setNewFeedUrl(e.target.value)}
                        className="input input-bordered flex-1"
                        required
                    />
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Добавление...' : 'Добавить'}
                    </button>
                </form>
            ) : (
                <p className="text-center text-gray-500 mb-4">
                    Войдите, чтобы добавить источник.
                </p>
            )}
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="collapse collapse-arrow mb-4">
                <input
                    type="checkbox"
                    className="peer"
                    onChange={() => setIsFeedsVisible(!isFeedsVisible)}
                />
                <div className="collapse-title text-xl font-medium">
                    {isFeedsVisible ? 'Скрыть источники' : 'Показать источники'}
                </div>
                <div className="collapse-content">
                    <ul>
                        {feeds
                            .filter(feed => feed.feedUrl !== 'https://logisticsinfo-lab.vercel.app/feed.xml')
                            .map((feed) => (
                                <li key={feed.id} className="flex justify-between items-center mb-2">
                                    <a
                                        href={feed.feedUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {feed.feedUrl}
                                    </a>
                                    {session && (
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => handleDeleteFeed(feed.id)}
                                        >
                                            Удалить
                                        </button>
                                    )}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ExternalFeedManager;
