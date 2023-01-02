module.exports = {
  images: {
    domains: [
      'assets.vercel.com',
      'storage.googleapis.com',
      'source.unsplash.com',
      'images.unsplash.com'
    ],
    formats: ['image/avif', 'image/webp'],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
