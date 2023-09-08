import { uploadImageToCloudinary } from '$lib/utils/utils.js';
import { error, json } from '@sveltejs/kit';
import { storyServices } from './actions.providers.js';



/** @type {import('./$types').RequestHandler} */

//ADD NEW STORY
export async function POST({ request, locals }) {
    try {
       
        let imgUrl = 'null'
        if (!locals.user) {
            throw error(401, 'Not Authorized');
        }

        const body = await request.formData();
        const imgArt = body.get('coverArt');

        //CHECK IF IMAGE IS AVAILABLE
        if (imgArt !== undefined && imgArt !== null && imgArt !=="undefined" ) {
            console.log('---server uploading imgArt ---', imgArt, typeof imgArt);
            imgUrl = await (await uploadImageToCloudinary(imgArt as File)).url;
        }
        
        const data = {
            title:body.get('title'),
            subtitle:body.get('subtitle'),
            author:locals.user._id, //server
            published: body.get('published'),
            coverArtUrl:imgUrl,//server
            genre:body.get('genre'),
            richtext:body.get('richtext'),
            plaintext: body.get('plaintext'),
            followUpStory: body.get('followUpStory'),
            mainStory: body.get('mainStory') &&  body.get('mainStory') as string
        }
        
        let res 

      //  console.log(data)
        if (data.mainStory === undefined || data.mainStory === null || data.mainStory == "undefined") {
            const newData = {
                title:body.get('title'),
                subtitle:body.get('subtitle'),
                author:locals.user._id, //server
                published: body.get('published'),
                coverArtUrl:imgUrl,//server
                genre:body.get('genre'),
                richtext:body.get('richtext'),
                plaintext: body.get('plaintext'),
                followUpStory: body.get('followUpStory'),
            }
            res = await storyServices.addNewBook(newData)
        } else {
            console.log('calling', data.mainStory)
            res = await storyServices.addNewChapter(data)
        }
       
      // console.log('---server after res---',res, data)

        if (!res) {
            throw error(500, 'Something went wrong');
        }


        //console.log(json(res))
        return json({ successful: true })
    } catch (/** @type {any} */ err) {
          console.log(err, 'from story servers')
        return json({ error: true, data: err })
    }
}


//ADD NEW STORY
export async function PUT({ request, locals, url}) {
    try {
        const Id = String(url.searchParams.get('bookId'));

        //console.log(url)
        if (!locals.user) {
            throw error(401, 'Not Authorized');
        }

        const body = await request.json();
       body.published = `${body.published}`
        
        const res = await storyServices.update(Id, body)
        
       
      // console.log('---server after res---',res, data)

        if (!res) {
            throw error(500, 'Something went wrong');
        }


        //console.log(json(res))
        return json({ successful: true, doc:res })
    } catch (/** @type {any} */ err) {
          console.log(err, 'from story servers')
        return json({ error: true, data: err })
    }
}




export async function GET({ url, locals }) {
    const search = String(url.searchParams.get('search'));
    const skip = Number(url.searchParams.get('skip') ?? '0');
    const regex = new RegExp(search, 'i');

   const resp = await locals.BOOK.find({ $or: [
       { title: { $regex: regex } },
       {
           subtitle: { $regex: regex },
       }
  ]}).skip(skip);

   if (!resp) {
    console.log(resp)
    throw error(400, 'min and max must be numbers, and min must be less than max');
    }

    return json(resp)
}