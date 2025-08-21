import { Inter,  Fjalla_One} from "next/font/google";
import "./styles/globals.css";
import { LanguageProvider } from "./hooks/LanguageContext";

// const inter = Inter({ subsets: ["latin"] });
const anton = Fjalla_One({ preload: true, subsets: ["latin"], weight: "400" });

export const metadata = {
  metadataBase: new URL('https://marucci.example.com'),
  title: {
    default: 'Marucci Official Website',
    template: '%s | Marucci',
  },
  description: 'Official website of Marucci',
  openGraph: {
    title: 'Marucci Official Website',
    description: 'Official website of Marucci',
    url: '/',
    siteName: 'Marucci',
    images: [
      { url: '/marucci-1.png', width: 1200, height: 630, alt: 'Marucci' },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marucci Official Website',
    description: 'Official website of Marucci',
    images: ['/marucci-1.png'],
  },
  icons: {
    icon: [
      { url: '/logo-white.png', sizes: '32x32', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={anton.className}>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </body>
    </html>
  );
}
