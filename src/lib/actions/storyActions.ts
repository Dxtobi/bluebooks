import { validateEditStory, validateNewStory } from "$lib/utils/validator.provider";





export const saveStoryFunction = async ({mainStory, followUpStory, title, subtitle, richtext, plaintext, coverArt, published, genre }: NewStory) => {
    try {
        const data = {
            title,
            subtitle,
            richtext,
            plaintext,
            coverArt,
            published,
            genre,
            followUpStory,
            mainStory
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
        formData.append('followUpStory', followUpStory);
        formData.append('mainStory', mainStory);

      

        const response = await fetch('/api/stories', {
            method: 'POST',
            body: formData // Use formData as the body
        });

        const result = await response.json();
        if (result.error) {
            return { error: true, message: result.data.body.message };
        }
        return result

    } catch (err) {
        console.log(err, 'from story-action');
        return { error: true, message: err };
    }
};



export const updateStoryFunction = async ({title, subtitle, richtext, plaintext, published, genre, postId }: UpdateStory) => {
    try {
        const data = {
            title,
            subtitle,
            richtext,
            plaintext,
            published,
            genre,
            postId
        };
        if (!validateEditStory(data)) {
            throw new Error("invalid data type");
        }
    


      

        const response = await fetch(`/api/stories?bookId=${postId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data) // Use formData as the body
        });

        const result = await response.json();
        if (result.error) {
            return { error: true, message: result.data.body.message };
        }
        return result

    } catch (err) {
        console.log(err, 'from story-action');
        return { error: true, message: err };
    }
};



