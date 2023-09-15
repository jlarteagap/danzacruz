/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
    minimumCacheTTL: 1500000
  }
}

module.exports = nextConfig
