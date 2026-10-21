/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Every <Image quality={…}> value used in components/ must be listed here (Next 16 requirement).
    qualities: [60, 68, 72, 75, 78],
  },
};

export default nextConfig;
