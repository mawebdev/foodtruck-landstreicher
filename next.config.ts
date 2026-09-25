import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Alte WordPress-URLs dauerhaft auf die neue Struktur umleiten,
  // damit bestehende Rankings und Backlinks erhalten bleiben.
  async redirects() {
    return [
      { source: "/unsere-speisekarte", destination: "/speisekarte", permanent: true },
      { source: "/den-landstreicher-buchen", destination: "/foodtruck-buchen", permanent: true },
      { source: "/datenschutzerklaerung", destination: "/datenschutz", permanent: true },
    ];
  },
};

export default nextConfig;
