import mongoose, { Document, Model } from 'mongoose';

interface Book extends Document {
  title: string;
  subtitle: string;
  author: string; //server
  published: string;
  numberOfPages: number;
  coverArtUrl: string;//server
  genre: string;
  createdAt: Date;//server
  updatedAt: Date;//server
  _id: string;//server
  richtext: string;
  plaintext: string;
}

type BookModel = Model<Book>

const bookSchema = new mongoose.Schema<Book, BookModel>(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    published: {
      type: String,
      required: true,
      default:'true',
    },
    
    numberOfPages: {
      type: Number,
      required: false,
    },
    coverArtUrl: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookModel: BookModel = mongoose.models.Book ?? mongoose.model<Book, BookModel>('Book', bookSchema);

export default BookModel;
