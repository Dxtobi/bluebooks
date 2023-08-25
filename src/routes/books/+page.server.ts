import fakeBooks from '$lib/fakedb/fakebooks.js';

export async function load({locals}) {


    //await locals.BOOK.find()
    //console.log(fakeBooks)
    return {
      books: fakeBooks,
      user: locals.user
    };
  }