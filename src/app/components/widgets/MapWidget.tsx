'use client';

import Script from 'next/script';

declare let ymaps: any;

export default function MapWidget() {
    const initMap = () => {
        ymaps.ready(() => {
            new ymaps.Map('map', {
                center: [55.76, 37.64],
                zoom: 7,
            });
        });
    };

    return (
        <div className="flex flex-col min-w-96">
            <div id="map" style={{ width: '400px', height: '400px' }}></div>
            <Script
                src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"
                strategy="afterInteractive"
                onLoad={initMap}
            />
            Виджет карта
        </div>
    );
}
