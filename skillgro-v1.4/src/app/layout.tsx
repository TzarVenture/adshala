"use client"
import "../styles/index.scss"
import { Provider } from "react-redux";
import store from "@/redux/store";
import Script from "next/script";

const isDev = process.env.NODE_ENV === 'development'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <head>
        <meta name="description" content="Join Adshalaa's Digital Marketing Certification Course. Learn SEO, Google Ads, Meta Ads, Social Media Marketing & AI tools with live projects, paid internship, and 100% job placement assistance." />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&display=swap" />
        <title>Best Digital Marketing Course with Certification | Adshalaa</title>
      </head>
      <body suppressHydrationWarning={true}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MKP87EQCYY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-MKP87EQCYY');
          `}
        </Script>
        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;
      n=f.fbq=function(){
        n.callMethod ?
        n.callMethod.apply(n,arguments) : n.queue.push(arguments)
      };
      if(!f._fbq)f._fbq=n;
      n.push=n;
      n.loaded=!0;
      n.version='2.0';
      n.queue=[];
      t=b.createElement(e);
      t.async=!0;
      t.src=v;
      s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s);
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', '1710089386893547');
    fbq('track', 'PageView');
  `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1710089386893547&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
