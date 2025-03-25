import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ReduxProvider from "./store/Provider";
import { Toaster } from "@/components/ui/sonner";

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
          <Toaster richColors/>
        <Footer/>
      </ReduxProvider>
      </body>
    </html>
  );
}
