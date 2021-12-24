/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'thumbor.forbes.com',
      'cdn.vox-cdn.com',
      'ipfs.infura.io',
      'lh3.googleusercontent.com',
      'encrypted-tbn0.gstatic.com',
    ],
  },
};
