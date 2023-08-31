export function validateNewStory(story: NewStory): boolean {
    if (
        typeof story.title !== 'string' ||
        typeof story.genre !== 'string' ||
        typeof story.subtitle !== 'string' ||
        typeof story.richtext !== 'string' ||
        typeof story.plaintext !== 'string' ||
       
        typeof story.published !== 'boolean'
    ) {
        return false;
    }
    
    return true;
}

export function validateEditStory(story: UpdateStory): boolean {
    if (
        typeof story.title !== 'string' ||
        typeof story.genre !== 'string' ||
        typeof story.subtitle !== 'string' ||
        typeof story.richtext !== 'string' ||
        typeof story.plaintext !== 'string' ||
        typeof story.published !== 'boolean' ||
        typeof story.postId !== 'string'
    ) {
        return false;
    }
    
    return true;
}