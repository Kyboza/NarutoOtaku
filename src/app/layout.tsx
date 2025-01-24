import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Naruto Otaku",
  description: "A site dedicated for Naruto fans, including a forum, a shop, a read about characters and userprofiles fans can explore the world of naruto",
  keywords: "Naruto, Otaku, Manga, Anime, Fan Art, Shop, Forum, Profiles, Favourite Character",
  openGraph: {
    title: "Naruto Otaku",
    description: "On this site you can engage with the Naruto community, visit the Naruto based shop or read about your favourite character",
    url: "http://localhost:3000",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[url('/images/website-standard/HiddenLeafBackground.jpg')] bg-cover bg-center flex flex-col min-h-screen">
        <Header/>
          <main className="min-h-[70dvh] lg:min-h-[70vh] flex-grow">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
