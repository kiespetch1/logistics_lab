export const metadata = {
    title: 'Одних отмена запрета на каботаж пугает, других – вдохновляет.',
};

export default function CabotageCancelPage() {
    const title = 'Одних отмена запрета на каботаж пугает, других – вдохновляет.';
    const content = `
    <p class="font-bold pb-0.5">Разрешение вступит в силу с 1 марта 2025 года</p>
    <img src="https://logirus.ru/upload/iblock/1bf/pl61v54ggutplr9sj40brpi7sn57n1ab/kab_p_6_12.jpg" alt="123">
    С 1 марта 2025 года перевозчики из стран Евразийского экономического союза (ЕАЭС) получат разрешение на каботажные перевозки по территории России. Соответствующее постановление Правительства опубликовано на портале официальных правовых актов. История вопроса Белоруссия и Россия отменят дозволы на перевозки в третьи страны в четыре захода Обычный каботаж для белорусов – вопрос решенный. Инвестиционный тоже не за горами Это постановление откроет российский рынок для перевозчиков из Казахстана, Беларуси и Армении. Для осуществления перевозок будет необходим оригинал международной транспортной накладной и внесение данных о перевозке в ГИС ЭПД. Разрешено не более трех последовательных рейсов в течение семи дней с момента первой выгрузки в России. Каждый рейс должен подтверждаться транспортной накладной и представлять собой этап к следующей погрузке или государственной границе. Кроме того, потребуется разрешение Ространснадзора и переход на ЭДО. Перевозка опасных грузов будет запрещена. Нарушение правил будет караться штрафом от 150 до 200 тыс. рублей. По словам коммерческого директора «Скиф-Карго» Михаила Коптева, открытие рынка может привести к увеличению объемов грузоперевозок как для российских, так и для иностранных компаний, что будет способствовать развитию всей отрасли. Кроме того, дополнительные мощности перевозчиков из стран ЕАЭС могут решить проблему дефицита грузовых автомобилей в определенных регионах или на определенных маршрутах, особенно в пиковые периоды. – С другой стороны, возможны сложности в регулировании рынка в связи с различиями в законодательствах России и стран ЕАЭС.`
    const date = new Date(2025, 1, 6, 12)

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="card-title text-3xl">{title}</h1>
                    <p className="text-sm text-gray-500 mb-4">
                        <em>Время: {date.toLocaleString("ru")}</em>
                    </p>
                    <div
                        className="prose"
                        dangerouslySetInnerHTML={{__html: content}}
                    />
                </div>
            </div>
        </div>
    );
}
