import "./globals.css";
import {Providers} from "./providers/providers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Script from "next/script";

export const metadata = {
    title: "Данные о логистике",
    description: "Приложение для логистических данных",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
        <head>
            <meta name="yandex-verification" content="98180330b9a77f8e"/>
            <Script id="yandex-metrika-script" strategy="afterInteractive">
                {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(99878993, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   })`};

            </Script>
            <title></title>
        </head>
        <body>
        <Providers>
            <div className="flex flex-col min-h-screen">
                <Header/>
                <main className="flex flex-grow justify-center container mx-auto px-2 py-4">
                    {children}
                </main>
                <Footer/>
            </div>
        </Providers>
        </body>
        </html>
    );
}
