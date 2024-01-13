'use server';

interface UnsplashImage {
    urls: {
        regular: string;
    };
}

export async function fetchUnsplashImages(query: string): Promise<string[]> {
    const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
    const url = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(query)}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Failed to fetch images: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data.results.map((image: UnsplashImage) => image.urls.regular);

    } catch (error) {
        console.error('Error fetching Unsplash images:', error);
        return [];
    }
}
