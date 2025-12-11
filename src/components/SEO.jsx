import { useEffect } from 'react';

/**
 * SEO Component for dynamic meta tag management
 * Use this component to set page-specific SEO metadata
 */
const SEO = ({
  title = "Pomocnik Obywatela - Wszystkie świadczenia publiczne w jednym miejscu",
  description = "Inteligentny asystent, który w sekundach znajdzie świadczenia, dotacje i dokumenty urzędowe. Bez biurokracji, bez skomplikowanych formularzy.",
  keywords = "świadczenia publiczne, dotacje, pomoc obywatelska, wnioski urzędowe, dokumenty urzędowe, inteligentny asystent",
  ogImage = "https://pomocnikobywatela.pl/logo.png",
  canonicalUrl = "https://pomocnikobywatela.pl/",
  structuredData = null
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Primary meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', canonicalUrl, true);

    // Twitter Card tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Add structured data if provided
    if (structuredData) {
      const scriptId = 'dynamic-structured-data';
      let script = document.getElementById(scriptId);

      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }

      script.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function
    return () => {
      // Optional: Reset to default values on unmount
      // This can be useful for SPA navigation
    };
  }, [title, description, keywords, ogImage, canonicalUrl, structuredData]);

  return null; // This component doesn't render anything
};

export default SEO;

/**
 * Usage example:
 *
 * import SEO from './components/SEO';
 *
 * function MyPage() {
 *   return (
 *     <>
 *       <SEO
 *         title="Custom Page Title"
 *         description="Custom page description"
 *         keywords="custom, keywords, here"
 *         canonicalUrl="https://pomocnikobywatela.pl/custom-page"
 *       />
 *       <div>Your page content...</div>
 *     </>
 *   );
 * }
 */
