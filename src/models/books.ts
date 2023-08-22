import mongoose, { Document, Model } from 'mongoose';

interface Book extends Document {
  title: string;
  author: string;
  releaseDate: string;
  numberOfPages: number;
  coverArtUrl: string;
  genre: string;
  createdAt: Date;
    updatedAt: Date;
    _id: string;
}

type BookModel = Model<Book>

const bookSchema = new mongoose.Schema<Book, BookModel>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    numberOfPages: {
      type: Number,
      required: true,
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
