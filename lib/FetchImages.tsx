const topicSlug = 'the-holidays';
const url = `https://api.unsplash.com/photos/random?topics=${topicSlug}&w=1920&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
const FALLBACK_IMAGE_URL = '/fallback1.jpg';

export default async function fetchUnsplashImage() {
    try {
        const res = await fetch(url);

        if (!res.ok) {
            if (res.status === 403) {
                return FALLBACK_IMAGE_URL;
            }
            throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        //return data.urls.regular;
        return FALLBACK_IMAGE_URL;

    } catch (error) {
        console.error('Error fetching Unsplash image:', error);
        return FALLBACK_IMAGE_URL;
    }
}
