import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'informer.yandex.ru',
                port: '',
                pathname: '/informer/99878993/**',
                search: '',
            },
        ],
    },
};

export default nextConfig;
