import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@/styles/index.scss";
import { Toaster } from "react-hot-toast";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Team Chat Application",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        <Toaster
          position="bottom-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              style: {
                backgroundColor: "#22c55e",
                color: "#ffffff",
              },
            },

            error: {
              duration: 3000,
              style: {
                backgroundColor: "#f43f5e",
                color: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
