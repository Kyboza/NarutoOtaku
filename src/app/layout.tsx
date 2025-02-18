import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ReduxProvider from "./store/Provider";

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
      <body className="bg-[url('/images/website-standard/HiddenLeafBackground.webp')] bg-cover bg-center flex flex-col min-h-screen">
      <ReduxProvider>
        <Header/>
          <main className="flex justify-center h-full flex-grow">{children}</main>
        <Footer/>
      </ReduxProvider>
      </body>
    </html>
  );
}
