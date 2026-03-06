import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/site.config";
import { faqItems, howToSteps } from "@/lib/content";

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-open-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    keywords: siteConfig.seo.keywords,
    metadataBase: new URL(`https://${siteConfig.domain}`),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: siteConfig.seo.title,
        description: siteConfig.seo.description,
        url: `https://${siteConfig.domain}`,
        siteName: siteConfig.siteName,
        locale: "de_DE",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.seo.title,
        description: siteConfig.seo.description,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const a = siteConfig.author;
    const l = siteConfig.legal;

    const jsonLdGraph = [
        {
            "@type": "WebSite",
            name: siteConfig.siteName,
            url: `https://${siteConfig.domain}`,
            description: siteConfig.description,
            inLanguage: "de-DE",
        },
        {
            "@type": "WebApplication",
            name: `KI-Potenzialanalyse für ${siteConfig.nicheLabel}`,
            description: siteConfig.description,
            url: `https://${siteConfig.domain}`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            provider: {
                "@type": "Organization",
                name: l.companyName,
                address: {
                    "@type": "PostalAddress",
                    streetAddress: l.street,
                    postalCode: l.zip,
                    addressLocality: l.city,
                    addressCountry: "DE",
                },
                telephone: l.phone,
                email: l.email,
            },
        },
        {
            "@type": "Person",
            "@id": `https://${siteConfig.domain}/#author`,
            name: a.name,
            jobTitle: a.role,
            url: a.linkedin,
            sameAs: [a.linkedin],
            worksFor: { "@type": "Organization", name: l.companyName },
            description: a.bio,
        },
        {
            "@type": "Article",
            headline: siteConfig.seo.title,
            description: siteConfig.seo.description,
            url: `https://${siteConfig.domain}`,
            inLanguage: "de-DE",
            author: { "@id": `https://${siteConfig.domain}/#author` },
            publisher: {
                "@type": "Organization",
                name: l.companyName,
                address: {
                    "@type": "PostalAddress",
                    streetAddress: l.street,
                    postalCode: l.zip,
                    addressLocality: l.city,
                    addressCountry: "DE",
                },
            },
            datePublished: "2025-01-15",
            dateModified: new Date().toISOString().split("T")[0],
        },
        {
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
        },
        {
            "@type": "HowTo",
            name: "KI-Potenzialanalyse für den Mittelstand durchführen",
            description:
                "So messen Sie den KI-Reifegrad Ihres mittelständischen Unternehmens in 4 einfachen Schritten durch unsere KI-Potenzialanalyse — kostenlos und in nur 5 Minuten.",
            totalTime: "PT5M",
            step: howToSteps.map((s, i) => ({
                "@type": "HowToStep",
                position: i + 1,
                name: s.name,
                text: s.text,
            })),
        },
    ];

    const jsonLd = { "@context": "https://schema.org", "@graph": jsonLdGraph };

    return (
        <html lang="de">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {/* Privacy-friendly analytics by Plausible */}
                <script async src="https://analytics.polymarkt.de/js/pa-jalqbKX7duasTKi6lRBsF.js" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`,
                    }}
                />
            </head>
            <body className={`${openSans.variable} font-body antialiased bg-page-bg text-brand-black`}>
                {children}
            </body>
        </html>
    );
}
