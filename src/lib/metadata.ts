export interface Metadata {
    title: string;
    description: string;
    keywords: string[];
    icons: {
        icon: string;
    };
    openGraph?: {
        title?: string;
        description?: string;
        image?: string;
        url?: string;
    };
    twitter?: {
        card?: string;
        title?: string;
        description?: string;
        image?: string;
    };
}

export const defaultMetadata: Metadata = {
    title: "NareL Digital - Premium Digital Marketplace",
    description: "NareL Digital is Indonesia's leading digital marketplace for premium digital products and services at affordable prices.",
    keywords: ["narel", "nareldigital", "digital products", "marketplace", "Indonesia", "premium apps", "digital services", "sleeping.stu"],
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        title: "NareL Digital - Premium Digital Marketplace",
        description: "NareL Digital is Indonesia's leading digital marketplace for premium digital products and services at affordable prices.",
        image: "https://cdn.discordapp.com/attachments/1251238050990657608/1409177941233107024/narel.png?ex=68ac6eba&is=68ab1d3a&hm=2e11c573830e506364bc1ed81c4fd7e337eea596982c6e0886737f8a86482ca0",
        url: "https://narel.id",
    },
    twitter: {
        card: "summary_large_image",
        title: "NareL Digital - Premium Digital Marketplace",
        description: "NareL Digital is Indonesia's leading digital marketplace for premium digital products and services at affordable prices.",
        image: "https://cdn.discordapp.com/attachments/1251238050990657608/1409177941233107024/narel.png?ex=68ac6eba&is=68ab1d3a&hm=2e11c573830e506364bc1ed81c4fd7e337eea596982c6e0886737f8a86482ca0",
    },
};

export const generateMetadata = (overrides: Partial<Metadata> = {}): Metadata => {
    return {
        ...defaultMetadata,
        ...overrides,
        keywords: overrides.keywords || defaultMetadata.keywords,
        icons: overrides.icons || defaultMetadata.icons,
        openGraph: {
            ...defaultMetadata.openGraph,
            ...overrides.openGraph,
        },
        twitter: {
            ...defaultMetadata.twitter,
            ...overrides.twitter,
        },
    };
};

export const pageMetadata = {
    home: defaultMetadata,
    products: generateMetadata({
        title: "Digital Products - NareL Digital Marketplace",
        description: "Browse our collection of premium digital products including apps, software, and digital services.",
    }),
    about: generateMetadata({
        title: "About Us - NareL Digital",
        description: "Learn about NareL Digital, Indonesia's leading digital marketplace established in 2022.",
    }),
    contact: generateMetadata({
        title: "Contact Us - NareL Digital Support",
        description: "Get in touch with our 24/7 customer support team for any questions or assistance.",
    }),
};