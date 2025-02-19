import Link from 'next/link';

export default function ArticlesPage() {
    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl mb-4">Статьи</h1>
            <ul className="space-y-2">
                <li>
                    <Link href="/articles/2025-warehouse-logistics" className="text-blue-600 hover:underline">
                        Автоперевозки: стратегии-2025
                    </Link>

                </li>
                <li>
                    <Link href="/articles/2025-strategies" className="text-blue-600 hover:underline">
                        Складская логистика: стратегии-2025
                    </Link>
                </li>
                <li>
                    <Link href="/articles/cabotage-cancel" className="text-blue-600 hover:underline">
                        Одних отмена запрета на каботаж пугает, других – вдохновляет
                    </Link>
                </li>
            </ul>
        </div>
    );
}
