
type NewStory = {
    title: string;
    genre: string;
    subtitle: string;
    richtext: string;
    plaintext: string;
    coverArt: File;
    published: boolean;
};


export const saveStoryFunction = async ({ title, subtitle, richtext, plaintext, coverArt, published, genre }: NewStory) => {
    try {
        const data = {
            title,
            subtitle,
            richtext,
            plaintext,
            coverArt,
            published,
            genre
        };
        if (!validateNewStory(data)) {
            throw new Error("invalid data type");
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        formData.append('richtext', richtext);
        formData.append('plaintext', plaintext);
        formData.append('coverArt', coverArt);
        formData.append('published', published.toString()); // Convert to string
        formData.append('genre', genre);

      

        const response = await fetch('/api/stories', {
            method: 'POST',
            body: formData // Use formData as the body
        });

        const result = await response.json();
        if (result.error) {
            return { error: true, message: result.data.body.message };
        }
        if (result.type === 'success') {
            return result;
        }
    } catch (err) {
        console.log(err, 'from story-action');
        return { error: true, message: err };
    }
};



function validateNewStory(story: NewStory): boolean {
    if (
        typeof story.title !== 'string' ||
        typeof story.genre !== 'string' ||
        typeof story.subtitle !== 'string' ||
        typeof story.richtext !== 'string' ||
        typeof story.plaintext !== 'string' ||
        !(story.coverArt instanceof File) ||
        typeof story.published !== 'boolean'
    ) {
        return false;
    }
    
    return true;
}

