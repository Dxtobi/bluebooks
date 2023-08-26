import { uploadImageToCloudinary } from '$lib/utils/utils.js';
import { error, json } from '@sveltejs/kit';



/** @type {import('./$types').RequestHandler} */



//REGISTER
export async function POST({ request, locals }) {

    try {
       
        
        if (!locals.user) {
            throw error(401, 'Not Authorized');
        }
       
        const body = await request.formData();
        const imgArt = body.get('coverArt');
        
        const imgUrl = await uploadImageToCloudinary(imgArt as File)


        const data = {
            title:body.get('title'),
            subtitle:body.get('subtitle'),
            author:locals.user._id, //server
            published: body.get('published'),
            numberOfPages:body.get('title'),
            coverArtUrl:imgUrl.url,//server
            genre:body.get('genre'),
            richtext:body.get('richtext'),
            plaintext:body.get('plaintext')
        }

        const res = locals.BOOK.create(data);

        if (!res) {
            throw error(500, 'Something went wrong');
        }


        return json({ successful: true })
    } catch (/** @type {any} */ err) {
          console.log(err, 'from story servers')
        return json({ error: true, data: err })
    }
}