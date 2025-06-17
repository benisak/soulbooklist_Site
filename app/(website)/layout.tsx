import "@/styles/tailwind.css";
import { Providers } from "./providers";
import { cx } from "@/utils/all";
import { Inter, Lora, Roboto_Serif } from "next/font/google";
import {
 
  getCategorizedPostCategories,
  getSettings
} from "@/lib/sanity/client";
import Footer from "@/components/footer";
import GetNavbar from "@/components/getnavbar";
import { urlForImage } from "@/lib/sanity/image";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora"
});

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  variable: "--font-roboto-serif",
});


async function sharedMetaData(params: any) {
  const settings = await getSettings();

  return {
    // enable this for resolving opengraph images
    // metadataBase: new URL(settings.url),
    title: {
      default:
        settings?.title ||
        "PopCornCrtitics - Discover the best movies critics",
      template: "%s | PopCornCrtitics - Discover the best movies critics"
    },
    description:
      settings?.description ||
      "Discover delicious, easy-to-follow recipes with step-by-step instructions and beautiful photos. From quick weeknight dinners to gourmet desserts, find the perfect recipe for any occasion. Browse our collection today!",
    keywords: ["movie reviews", "movie ratings", "best movies to watch", "new movie reviews", "top 10 movies of 2025", "latest movie releases", "best thriller movies reviews 2025", "family-friendly movie reviews", "movie critics and ratings", "new movies", "movie ratings", "top movies of 2025", "best horror movies 2025", "movies for kids 2025"],
    authors: [{ name: "Surjith" }],
    canonical: settings?.url,
    openGraph: {
      images: [
        {
          url:
            urlForImage(settings?.openGraphImage)?.src ||  
            "/img/opengraphPCC.png",
          width: 800,
          height: 600
        }
      ]
    },
    twitter: {
      title: settings?.title || "PopCornCrtitics - Discover the best movies critics",
      card: "summary_large_image"
    },
    robots: {
      index: true,
      follow: true
    }
  };
}
const siteUrl = "https://www.popcornncritics.com"; // Ensure this is correct
export async function generateMetadata({ params }: { params: any }) {
  const settings = await getSettings();

  const siteTitle = "PopCornCrtitics - Discover the best movies critics";
  const siteDescription =
    "PopCornCritics is your ultimate destination for discovering insightful movie reviews, ratings, and critiques from top critics and passionate cinephiles. Whether you're looking for blockbuster hits, indie gems, or timeless classics, we bring you expert opinions and community-driven insights to help you pick your next favorite film."
  const keywords = [
    "movie reviews", 
    "movie ratings",
    "best movies to watch",
    "new movie reviews",
    "top 10 movies of 2025",
    "latest movie releases",
    "best thriller movies reviews 2025",
    "family-friendly movie reviews",
    "movie critics and ratings",
    "new movies",
    "movie ratings",
    "top movies of 2025",
    "best horror movies 2025",
    "movies for kids 2025"
  ];

  const ogImage = `${siteUrl}/img/opengraphPCC.png`;
  const twitterHandle = "@myoldwine";

  return {
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`
    },
    description: siteDescription,
    keywords: keywords,
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: siteUrl, // Ensure this is correct
      images: [
        {
          url: ogImage, // Corrected to avoid duplication
          width: 1200, // Recommended Open Graph size
          height: 630,
          alt: "MyOldWine Open Graph Image"
        }
      ],
      siteName: "Myoldwine",
      type: "website"
    },
    twitter: {
      title: siteTitle,
      description: siteDescription,
      card: "summary_large_image",
      site: twitterHandle,
      images: [ogImage]
    },
    icons: {
      icon: "/img/FaviconPC.svg",
      apple: "/img/FaviconPC.svg"
    }
  };
}


export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: any;
}) {
  const settings = await getSettings();

  //Here we are fetching the categories for the navbar and the category list,
  //these lists we are going to be passing to the components by props

  const categoriesForNavbar = await getCategorizedPostCategories(2);
  const categoriesForNavbar1 = await getCategorizedPostCategories(2);
  const categoriesForNavbarMobileList = await getCategorizedPostCategories(7);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cx(inter.variable, lora.variable, robotoSerif.variable)}>
       <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PMBW66JM');`
          }}
        />
        {/* End Google Tag Manager */}
        {/* Custom favicon links */}
        <link rel="icon" type="image/png" sizes="32x32" href="/img/FaviconPC.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/FaviconPC.svg" />
        </head> 
      <body className="text-gray-800 antialiased dark:bg-black dark:text-gray-400">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-PMBW66JM"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Providers>
          <GetNavbar topAndOtherCategories={categoriesForNavbar} Categoriesmobile3={categoriesForNavbar1} CategoriesmobileList={categoriesForNavbarMobileList}  />
          <div>{children}</div>
          <Footer {...settings} />
        </Providers>
      </body>
    </html>
  );
}

export const revalidate = 86400;
