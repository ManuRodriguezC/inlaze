/** @type {import('next').NextConfig} */
const nextConfig = {};

nextConfig.eslint = {
    ignoreDuringBuilds: false
}

nextConfig.images = {
    domains: ['image.tmdb.org']
}

export default nextConfig;
