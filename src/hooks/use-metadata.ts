import { useEffect } from 'react';
import { Metadata, defaultMetadata, generateMetadata } from '@/lib/metadata';

export const useMetadata = (metadata?: Partial<Metadata>) => {
    useEffect(() => {
        if (metadata) {
            const finalMetadata = generateMetadata(metadata);

            if (finalMetadata.title) {
                document.title = finalMetadata.title;
            }

            if (finalMetadata.description) {
                const descriptionMeta = document.querySelector('meta[name="description"]');
                if (descriptionMeta) {
                    descriptionMeta.setAttribute('content', finalMetadata.description);
                }
            }

            if (finalMetadata.keywords) {
                const keywordsMeta = document.querySelector('meta[name="keywords"]');
                if (keywordsMeta) {
                    keywordsMeta.setAttribute('content', finalMetadata.keywords.join(', '));
                }
            }

            if (finalMetadata.openGraph) {
                const ogTags = [
                    { property: 'og:title', content: finalMetadata.openGraph.title },
                    { property: 'og:description', content: finalMetadata.openGraph.description },
                    { property: 'og:image', content: finalMetadata.openGraph.image },
                    { property: 'og:url', content: finalMetadata.openGraph.url },
                ];

                ogTags.forEach(({ property, content }) => {
                    if (content) {
                        const meta = document.querySelector(`meta[property="${property}"]`);
                        if (meta) {
                            meta.setAttribute('content', content);
                        }
                    }
                });
            }

            if (finalMetadata.twitter) {
                const twitterTags = [
                    { name: 'twitter:title', content: finalMetadata.twitter.title },
                    { name: 'twitter:description', content: finalMetadata.twitter.description },
                    { name: 'twitter:image', content: finalMetadata.twitter.image },
                    { name: 'twitter:card', content: finalMetadata.twitter.card },
                ];

                twitterTags.forEach(({ name, content }) => {
                    if (content) {
                        const meta = document.querySelector(`meta[name="${name}"]`);
                        if (meta) {
                            meta.setAttribute('content', content);
                        }
                    }
                });
            }
        }
    }, [metadata]);
};

export { defaultMetadata, generateMetadata, type Metadata };