import { serializeNonPOJOs } from '$lib/utils/utils.js';


export async function load({locals}) {


    const res = await locals.BOOK.find({author:locals.user._id}).sort({createdAt: -1}).select('_id title subtitle published')
    if (!res) {
        return {
            user: locals.user,
            books:[]
          };
    }
    //console.log(fakeBooks)
    return {
        books: serializeNonPOJOs(res),
        user: locals.user,

    };
  }