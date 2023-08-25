import { error, json } from '@sveltejs/kit';

import bcrypt from 'bcrypt';
import crypto from 'crypto';

/** @type {import('./$types').RequestHandler} */



//REGISTER
export async function POST({ request, locals }) {

    try {
       
        if (!locals.user) {
            throw error(401, 'Not Authorized')
        }
       


        return json({ successful: true })
    } catch (/** @type {any} */ err) {
          console.log(err)
        return json({ error: true, data: err })
    }
}