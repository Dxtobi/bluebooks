// See https://kit.svelte.dev/docs/types#app

import type BookModel from "./models/books";
import type RatingModel from "./models/rating";
import type UserModel from "./models/user";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			BOOK: BookModel;
			USER: UserModel;
			RATING: RatingModel;
			user: User;
		 }
		interface PageData {
			 books: Array<Book>
		 }
		// interface Platform {}
	}
}


type Book = {
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
  
type Rating = {
    bookId: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    score: number;
    createdAt: Date;
	updatedAt: Date;
	_id: string;
} 
  
type User =  {
	username: string;
	email: string;
	points: number;
	createdAt: Date;
	updatedAt: Date;
	_id: string;
  }
export {};
