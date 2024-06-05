import { Analytics } from "@/components/analytics";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Nunito_Sans as FontSans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const fontSans = FontSans({
  subsets: ["latin"],
  // weight: ["400", "700", "300", ""],
  variable: "--font-sans",
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <!-- Basic Page Needs --> */}
        <meta charSet="utf-8" />
        <title>Legalysis - Advanced Legal Document Analysis</title>
        <meta
          name="description"
          content="With Legalysis, gain insights into contracts and legal documents using advanced LLM models. Identify risks, understand complexities, and generate concise summaries in a few clicks. Try us now for efficient legal document analysis."
        />

        {/* <!-- Mobile Specific Metas --> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* <!-- Icons --> */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href="https://legalysis.co" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:url" content="https://legalysis.co/" />
        <meta
          property="og:title"
          content="Legalysis - Advanced Legal Document Analysis"
        />
        <meta
          property="og:description"
          content="Leverage cutting-edge LLM models to thoroughly analyze contracts or other legal documents, identifying potential risks and vulnerabilities efficiently."
        />
        <meta
          property="og:image"
          content="https://legalysis.co/social-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://legalysis.co/" />
        <meta
          name="twitter:title"
          content="Legalysis - Advanced Legal Document Analysis"
        />
        <meta
          name="twitter:description"
          content="Leverage cutting-edge LLM models to thoroughly analyze contracts or other legal documents, identifying potential risks and vulnerabilities efficiently."
        />
        <meta
          name="twitter:image"
          content="https://legalysis.co/social-image.jpg"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
                    {
                        "@context": "https://schema.org/",
                        "@type": "SoftwareApplication",
                        name: "Legalysis",
                        description: "Advanced legal document analysis tool powered by AI",
                        applicationCategory: "BusinessApplication",
                        operatingSystem: "Web",
                    }`,
          }}
        ></script>
      </head>
      <GoogleAnalytics GA_MEASUREMENT_ID="G-74CHDTTPYY" />
      <body
        // className={cn(
        //   "min-h-screen bg-background font-sans antialiased mr-0",
        //   fontSans.variable,
        //   fontHeading.variable
        // )}
      >
        <div className="vh">
          <div>
            <div className="wrap">
              <h1>Maintenance mode</h1>
              <h2>
                <p>
                  Sorry for the inconvenience.
                  <br />
                  Our website is currently undergoing scheduled maintenance.
                  <br />
                  <br />
                </p>
              </h2>
              <p>Thank you for your understanding.</p>
            </div>
          </div>
        </div>
        {/* <ThemeProvider attribute="class" defaultTheme="system" forcedTheme="light" enableSystem>
                    {children}
                    <Analytics />
                    <Toaster />
                    <TailwindIndicator />
                </ThemeProvider> */}
      </body>
    </html>
  );
}
