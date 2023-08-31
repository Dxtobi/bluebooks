type NewStory = {
    title: string;
    genre: string;
    subtitle: string;
    richtext: string;
    plaintext: string;
    coverArt: File ;
    published: boolean;
    followUpStory: string,
    mainStory:string
};


    type UpdateStory = {
        title:string;
        subtitle:string;
        richtext:string;
        plaintext:string;
        published:boolean;
        genre: string;
        postId: string;
};
    
type Book = {
    _id:string
    title: string;
    genre: string;
    subtitle: string;
    richtext: string;
    plaintext: string;
    coverArtUrl: string ;
    published: string;
    followUpStory: string,
    mainStory: string
    numberOfPages: string;
    updatedAt: string
    author: Author,
    totalRating:number
    reviewCount:number
};

type Author = {
    username: string;
    _id: string;
    points: number;

}