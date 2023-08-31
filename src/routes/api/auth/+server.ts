import { error, json } from '@sveltejs/kit';

import bcrypt from 'bcrypt';
import crypto from 'crypto';

/** @type {import('./$types').RequestHandler} */



//REGISTER
export async function POST({ request, locals }) {

    try {
        const body = await request.json()

        console.log(body)
        const user = await locals.USER.findOne({ email: body.email.toLowerCase() })
        const username = await locals.USER.findOne({ username: body.name.toLowerCase() })

        //console.log(body)

        if (user || username) {
            throw error(400, 'details already exist');
        }
        const pass = await bcrypt.hash(body.password, 10)
       // console.log(pass)
        await locals.USER.create({
            email: body.email.toLowerCase(),
            password: pass,
            userAuthToken: crypto.randomUUID(),
            username: body.name.toLowerCase(),
            role: 'USER',

        },
        );



        return json({ successful: true })
    } catch (/** @type {any} */ err) {
          console.log(err)
        return json({ error: true, data: err })
    }
}

//LOGIN
export async function PUT({ request, locals, cookies }) {

    try {
        const body = await request.json()
        let user = await locals.USER.findOne({ email: body.email.toLowerCase() })
      
       console.log(user)

        if (!user) {
            user = await locals.USER.findOne({ username: body.name.toLowerCase() })
            console.log(user)
            if (!user) {
                throw error(404, 'wrong details');
            }
        }

        const userPassword = await bcrypt.compare(body.password, user.password);
        if (!userPassword) {
            throw error(401, 'wrong details')
        }

        const newID = crypto.randomUUID();
        // generate new auth token just in case  
        // eslint-disable-next-line no-unused-vars
        const authenticatedUser = await locals.USER.findByIdAndUpdate(user._id, { userAuthToken: newID })
        if (!authenticatedUser) throw error(401, 'wrong details');

         cookies.set('session-book', newID, {
            // send cookie for every page
            path: '/',
            // server side only cookie so you can't use `document.cookie`
            httpOnly: true,
            // only requests from same site can send cookies
            sameSite: 'strict',
            // only sent over HTTPS in production
            secure: process.env.NODE_ENV === 'production',
            // set cookie to expire after a year
            maxAge: 60 * 60 * 24 * 360,
        })


        locals.user = user

       // console.log(cookies_set, cookies)
        return json({ successful: true, token:cookies.get('session-book') })
    } catch (/** @type {message:String| body:{message:string}} */ err) {
        //  console.log(error)
        return json({ error: true, data: err })
    }
}


