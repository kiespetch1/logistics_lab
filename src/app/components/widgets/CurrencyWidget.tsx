"use client";

import Script from "next/script";

const CurrencyWidget = () => {
    return (
        <div>
            {/* Скрипт будет загружен после инициализации страницы */}
            <Script
                src="https://s.fx-w.io/widgets/currency-converter/latest.js"
                strategy="afterInteractive"
            />
            <div>
                <fxwidget-cc
                    amount="1"
                    decimals="2"
                    large="false"
                    shadow="true"
                    symbol="true"
                    grouping="true"
                    border="true"
                    from="USD"
                    to="RUB"
                    background-color="#f0f8ff"
                    border-radius="0.1"
                ></fxwidget-cc>
            </div>
            <a href="https://currencyrate.today/">CurrencyRate</a>
            <br/>
            Виджет курс валют
        </div>
    );
};

export default CurrencyWidget;
