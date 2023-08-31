import { serializeNonPOJOs } from '$lib/utils/utils.js';


export async function load({locals, url}) {

    console.log(url.searchParams.get('id'))
    const id = url.searchParams.get('id')
    const res = await locals.BOOK.findById(id)
    if (!res) {
        return {
            user: locals.user,
            book:[]
          };
    }
    //console.log(fakeBooks)
    return {
        book: serializeNonPOJOs(res),
        user: locals.user,

    };
  }