/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
    minimumCacheTTL: 6000000
  }
}

module.exports = nextConfig
