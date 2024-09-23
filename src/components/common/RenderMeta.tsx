import React from "react";
import Head from "next/head";

export const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="none">
  <circle cx="100" cy="100" r="95" fill="#4CAF50" />
  <path d="M100 30C67.9086 30 42 55.9086 42 88C42 120.091 100 170 100 170C100 170 158 120.091 158 88C158 55.9086 132.091 30 100 30Z" fill="white" />
  <path d="M85 95L95 105L115 85" stroke="#000000" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
</svg>`;

const logoUrl = `data:image/svg+xml;base64,${btoa(logoSvg)}`;

interface RootProps {
  title: string;
  description: string;
  keywords?: string;
}

const RenderMeta: React.FC<RootProps> = ({ title, description, keywords }) => {
  const moreKeywords = `
  doctors, healthcare, appointments, Sihatuk, medical, health, clinic, hospital,
  دكتور, مستشفى, عيادة, صحتك, طبيب, صحة, موعد , عنايه بالصحه`;

  return (
    <Head>
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="apple-touch-icon" href="/icons/logo.svg" />

      <meta name="description" content={description} />
      <meta name="keywords" content={`${keywords || ""} ${moreKeywords}`} />
      <meta name="author" content="Your Name" />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={logoUrl} />

      <meta property="og:image:url" content={logoUrl} />
      <meta property="og:image:alt" content="Sihatuk Logo" />

      <meta name="twitter:site" content="@sihatuk" />
      <link rel="shortcut icon" href={logoUrl} type="image/x-icon" />
      <title>{title}</title>

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {/* <meta property="og:url" content={document && window.location.href} /> */}
      <meta property="og:image" content={logoUrl} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:title" content={title} /> */}
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={logoUrl} />

      {/* <link rel="canonical" href={document && window.location.href} /> */}
    </Head>
  );
};

export default RenderMeta;
