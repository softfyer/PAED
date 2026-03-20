import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'PAED - Plataforma de Apoio à Educação Diversificada',
  description: 'Repositório de materiais didáticos inclusivos para pedagogos e professores.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-[#fdfcf9] text-stone-900 min-h-screen font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
