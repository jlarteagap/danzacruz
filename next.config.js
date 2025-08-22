/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [
      "firebase-admin",
      "@auth/firebase-adapter",
    ],
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
    minimumCacheTTL: 6000000,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Excluir completamente firebase-admin y sus dependencias del cliente
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "firebase-admin": false,
        "firebase-admin/app": false,
        "firebase-admin/firestore": false,
        "firebase-admin/auth": false,
        "google-auth-library": false,
        "gcp-metadata": false,
        "google-logging-utils": false,
        farmhash: false,
      };

      // Excluir módulos Node.js problemáticos
      config.resolve.alias = {
        ...config.resolve.alias,
        "firebase-admin": false,
      };
    }

    // Configurar externals para el servidor
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        "firebase-admin": "firebase-admin",
        "firebase-admin/app": "firebase-admin/app",
        "firebase-admin/firestore": "firebase-admin/firestore",
      });
    }

    return config;
  },
};

module.exports = nextConfig;
