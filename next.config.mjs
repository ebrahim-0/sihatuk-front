import nextTranslate from "next-translate-plugin";
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = nextTranslate({
  reactStrictMode: true,
  swcMinify: true, // Enable SWC minification for improved performance
  compiler: {
    removeConsole: true,
  },
});

export default withPWA({
  dest: "public", // destination directory for the PWA files
  register: true, // register the PWA service worker
  // skipWaiting: true, // skip waiting for service worker activation
})(nextConfig);

// export default nextConfig;
