"use client";

export default function Footer() {
    return (
        <footer className="footer items-center p-4 bg-base-200 text-base-content">
            <div>
                {/* Статически указан текущий год */}
                <p>© 2025</p>
            </div>
            <div className="md:place-self-center md:justify-self-end">
                <small>Данные о логистике</small>
            </div>
        </footer>
    );
}
