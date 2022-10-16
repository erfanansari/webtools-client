/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'avatars.githubusercontent.com',
            'images.unsplash.com',
            'picsum.photos',
        ],
    },
}

module.exports = nextConfig
