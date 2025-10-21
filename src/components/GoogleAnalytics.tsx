// components/GoogleAnalytics.tsx
'use client';
import Script from 'next/script';

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-C19JYX08DB`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-C19JYX08DB', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;