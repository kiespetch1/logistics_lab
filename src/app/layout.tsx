import "./globals.css";
import {Providers} from "./providers/providers";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
        <body>
        <Providers>
            <div className="flex flex-col min-h-screen">
                <Header/>
                <main className="flex-grow container mx-auto px-4 py-6">
                    {children}
                </main>
                <Footer/>
            </div>
        </Providers>
        </body>
        </html>
    );
}
