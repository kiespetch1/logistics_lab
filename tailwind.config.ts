import daisyui from "daisyui";
import type {Config} from "tailwindcss";

interface ExtendedConfig extends Config {
    daisyui?: {
        themes: string[];
    };
}

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            "winter",
        ],
    },
} satisfies ExtendedConfig;
