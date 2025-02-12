import Image from "next/image";

const YandexMetric = () => {
    return (
        <>
            <a href="https://metrika.yandex.ru/stat/?id=99878993&amp;from=informer"
               target="_blank" rel="nofollow">
                <Image
                    src="https://informer.yandex.ru/informer/99878993/3_1_FFFFFFFF_EFEFEFFF_0_pageviews"
                    width={88}
                    height={31}
                    style={{border: "0"}}
                    alt="Яндекс.Метрика"
                    title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)"
                    className="ym-advanced-informer" data-cid="99878993" data-lang="ru"/>
            </a>
        </>
    )
};

export default YandexMetric