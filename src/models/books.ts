import mongoose, { Document, Model } from 'mongoose';

interface Book extends Document {
  title: string;
  subtitle: string;
  author:mongoose.Types.ObjectId;//server
  published: string;
  numberOfPages: number;
  coverArtUrl: string;//server
  genre: string;
  createdAt: Date;//server
  updatedAt: Date;//server
  _id: string;//server
  richtext: string;
  plaintext: string;
  mainStory: mongoose.Types.ObjectId;
  readBy: Array<mongoose.Schema.Types.ObjectId>;
  totalRating: number;
  reviewCount: number;
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mainStory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
    published: {
      type: String,
      required: true,
      default:'true',
    },
    plaintext: {
      type: String,
      required: true,
    },
    richtext: {
      type: String,
      required: true,
    },
    numberOfPages: {
      type: Number,
      required: false,
      default: 1
    },
    
    coverArtUrl: {
      type: String,
      required: true,
      default:'null'
    },
    genre: {
      type: String,
      required: true,
    },
    readBy: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
    totalRating: {
      type: Number,
      default: 3,
    },
    reviewCount: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const BookModel: BookModel = mongoose.models.Book ?? mongoose.model<Book, BookModel>('Book', bookSchema);

export default BookModel;
