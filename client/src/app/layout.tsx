import type { Metadata } from "next";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import localFont from "next/font/local";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Threads",
  description: "X/Twitter clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientId =
    process.env.NEXT_PUBLIC_GCP_OAUTH_CLIENT_ID || "fallback-client-id";

  if (!clientId || clientId === "fallback-client-id") {
    console.warn(
      "Using fallback Google OAuth Client ID. Please set NEXT_PUBLIC_GCP_OAUTH_CLIENT_ID in your environment.",
    );
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <GoogleOAuthProvider clientId={clientId}>
            {children}
            <Toaster />
            <ReactQueryDevtools />
          </GoogleOAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
