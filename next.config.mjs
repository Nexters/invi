/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/ut",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
