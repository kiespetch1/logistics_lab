import React, { useEffect } from 'react';

declare global {
    interface Window {
        Ya?: {
            Site?: {
                Form?: {
                    init: () => void;
                };
                Results?: {
                    init: () => void;
                };
            };
        };
        yandex_site_callbacks?: Array<() => void>;
    }
}

const YandexSearch: React.FC = () => {
    useEffect(() => {
        const htmlElement = document.documentElement;
        if (!htmlElement.className.includes('ya-page_js_yes')) {
            htmlElement.className += ' ya-page_js_yes';
        }

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.charset = 'utf-8';
        script.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//site.yandex.net/v2.0/js/all.js';
        document.body.appendChild(script);

        window.yandex_site_callbacks = window.yandex_site_callbacks || [];
        window.yandex_site_callbacks.push(() => {
            if (
                window.Ya &&
                window.Ya.Site &&
                window.Ya.Site.Form &&
                typeof window.Ya.Site.Form.init === 'function'
            ) {
                window.Ya.Site.Form.init();
            }
        });
    }, []);

    const containerStyle = {
        width: '200px',
        backgroundColor: '#ffcc00',
    }


    return (
        <div className="mr-3">
            <div
                className="ya-site-form ya-site-form_inited_no"
                style={containerStyle}
                data-bem='{"action":"http://logisticsinfo-lab.vercel.app/search","arrow":false,"bg":"transparent","fontsize":12,"fg":"#000000","language":"ru","logo":"rb","publicname":"Поиск по logisticsinfo-lab.vercel.app","suggest":true,"target":"_blank","tld":"ru","type":2,"usebigdictionary":true,"searchid":11986334,"input_fg":"#333333","input_bg":"#ffffff","input_fontStyle":"normal","input_fontWeight":"normal","input_placeholder":"Поиск по страницам","input_placeholderColor":"#000000","input_borderColor":"#7f9db9"}'
            >
                <form
                    action="https://yandex.ru/search/site/"
                    method="get"
                    target="_blank"
                    acceptCharset="utf-8"
                >
                    <input type="hidden" name="searchid" value="11986334" />
                    <input type="hidden" name="l10n" value="ru" />
                    <input type="hidden" name="reqenc" value="" />
                    <input type="search" name="text" defaultValue="" />
                    <input type="submit" value="Найти" />
                </form>
            </div>
            <style type="text/css">
                {`.ya-page_js_yes .ya-site-form_inited_no { display: none; }`}
            </style>
        </div>
    );
};

export default YandexSearch;
