import { JSDOM } from 'jsdom';

export async function getPageMetadata(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const getMetaContent = (name: string) => {
      const meta = doc.querySelector(`meta[property="og:${name}"]`) || 
                  doc.querySelector(`meta[name="og:${name}"]`) ||
                  doc.querySelector(`meta[property="twitter:${name}"]`);
      return meta?.getAttribute('content');
    };

    return {
      title: getMetaContent('title') || doc.title,
      description: getMetaContent('description'),
      image: getMetaContent('image'),
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return null;
  }
} 