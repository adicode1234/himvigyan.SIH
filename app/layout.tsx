import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "HimVigyan | Explore • Research • Preserve (NCPOR / MoES)",
  description: "HimVigyan - National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, Government of India. Explore India's Polar Science expeditions, research, datasets, and media.",
  icons: {
    icon: [
      { url: '/himvigyan-crest.png?v=4', type: 'image/png' },
      { url: '/favicon.ico?v=4', type: 'image/x-icon' }
    ],
    shortcut: '/himvigyan-crest.png?v=4',
    apple: '/apple-touch-icon.png?v=4',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/himvigyan-crest.png?v=4" />
        <link rel="shortcut icon" href="/himvigyan-crest.png?v=4" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=4" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('polar_theme');
                  if (saved === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased selection:bg-sky-500 selection:text-white flex flex-col transition-colors duration-200">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
