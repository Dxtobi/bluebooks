import { serializeNonPOJOs } from '$lib/utils/utils.js';

export async function load({locals}) {


    const allBooks = serializeNonPOJOs(await locals.BOOK.find().populate('author').limit(20).sort({updatedAt:-1}))
    //console.log(fakeBooks)
    return {
      books: allBooks as Array<Book> ,
      user: locals.user
    };
  }