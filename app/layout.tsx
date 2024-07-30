import type { Metadata } from 'next';
import { Barlow } from 'next/font/google';
import './globals.css';

const barlow = Barlow({
 subsets: ['latin'],
 weight: ['400', '500', '600', '700', '800', '900'],
 variable: '--font-barlow',
});
import { cn } from '@/lib/utils';
import Provider from '@/provider';

export const metadata: Metadata = {
 title: 'Nextjs template with shadcn.',
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en" suppressHydrationWarning>
   <body
    className={cn(
     'min-h-screen bg-background font-barlow antialiased',
     barlow.variable,
     barlow.className
    )}
             >
                   <Provider session={undefined}>
                         
    {children}
                   </Provider>
   </body>
  </html>
 );
}
