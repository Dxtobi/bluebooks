import { serializeNonPOJOs } from '$lib/utils/utils.js';
import { redirect } from '@sveltejs/kit';


export async function load({locals,  params}) {

   try {
    const Id = params.id;
      // console.log(url)
      //console.log(params)
      
      const res = await locals.BOOK.findOne({ _id: Id }).populate('author');

      await locals.BOOK.findByIdAndUpdate(
         Id,
         { "$addToSet": { "readBy": locals.user?._id } },
         { "new": true, "upsert": true }
       );
      //readBy
      //console.log(res)
    if (!res) {
     
       return  redirect(303, '/books')
    }
    //console.log(fakeBooks)
    return {
        book: serializeNonPOJOs(res) as Book,
        user: locals.user,

    };
   } catch (error) {
       
      redirect(303, '/books')
   }
  }