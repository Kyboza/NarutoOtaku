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
      <body className="flex flex-col min-h-screen">
      <Toaster/>
      <ReduxProvider>
        <Header/>
          <main className="flex justify-center h-full flex-grow">{children}</main>
        <Footer/>
      </ReduxProvider>
      </body>
    </html>
  );
}
