type CreateBookDto = {
    title:FormDataEntryValue | null,
    subtitle:FormDataEntryValue | null,
    author:string, //server
    published: FormDataEntryValue | null,
    coverArtUrl:string,//server
    genre:FormDataEntryValue | null,
    richtext:FormDataEntryValue | null,
    plaintext:FormDataEntryValue | null
}

type AddChapterBookDto = CreateBookDto & {
    numberOfPages?: number | null,
    mainStory?: string  | null
}

