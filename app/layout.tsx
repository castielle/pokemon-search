import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

// components
import Navbar from "./components/navbar";

const rubik = Rubik({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Search Pokemon",
  description: "Search Pokemon",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <title>Search Pokemon</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"/>
    </head>
    <body className={rubik.className}>
    <Navbar/>
    {children}
    </body>
    </html>
  );
}
