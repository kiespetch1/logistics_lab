"use client";

import React, {useEffect} from "react";

export default function SearchResultsPage() {
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.charset = "utf-8";
        const protocol = document.location.protocol === "https:" ? "https:" : "http:";
        script.src = protocol + "//site.yandex.net/v2.0/js/all.js";

        const firstScript = document.getElementsByTagName("script")[0];
        if (firstScript.parentNode) {
            firstScript.parentNode.insertBefore(script, firstScript);
        }

        window.yandex_site_callbacks = window.yandex_site_callbacks || [];
        window.yandex_site_callbacks.push(() => {
            if (window.Ya && window.Ya.Site && window.Ya.Site.Results) {
                window.Ya.Site.Results.init();
            }
        });
    }, []);

    return (
        <div className="container mx-auto py-8 px-4">
            <h3 className="text-3xl font-bold text-slate">Результаты поиска:</h3>
            {/* Контейнер, в который будут загружены результаты поиска */}
            <div
                id="ya-site-results"
                data-bem='{"tld": "ru", "language": "ru", "encoding": "", "htmlcss": "1.x", "updatehash": true}'
            />
        </div>
    );
}
