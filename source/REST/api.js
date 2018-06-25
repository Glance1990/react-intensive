import { TOKEN, MAIN_URL } from './config';

export const api = {
    async fetchPosts () {
        const response = await fetch(`${MAIN_URL}?size=20`, {
            method: 'GET',
        });

        if (response.status !== 200) {
            throw new Error('Posts were not loaded');
        }

        const { data: posts } = await response.json();

        return posts;
    },
    async createPost (comment) {
        const response = await fetch(MAIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN,
            },
            body: JSON.stringify({ comment })
        });

        if (response.status !== 200) {
            throw new Error('Posts were not created');
        }

        const { data: post } = await response.json();

        return post;
    },
}
