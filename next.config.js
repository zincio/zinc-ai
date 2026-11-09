/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'i5.walmartimages.com',
      },
      {
        protocol: 'https',
        hostname: '**.walmartimages.com',
      },
    ],
  },
  serverExternalPackages: ['better-sqlite3'],

  // The app answers on several hostnames in Railway. Only ai.zinc.com is
  // canonical; the others 301 to it, one hop each. Next carries the query
  // string across, so ?q= launch links and ?sessionId= links keep working.
  // Keep the old hostnames attached in Railway so they still get TLS.
  async redirects() {
    const canonical = 'https://ai.zinc.com'
    const legacyHosts = ['chat.zinc.com', 'gpt.zinc.com', 'zinc-gpt.up.railway.app']
    return legacyHosts.map((host) => ({
      source: '/:path*',
      has: [{ type: 'host', value: host }],
      destination: `${canonical}/:path*`,
      permanent: true,
    }))
  },
}

module.exports = nextConfig
