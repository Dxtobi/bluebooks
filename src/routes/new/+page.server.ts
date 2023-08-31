import { redirect } from "@sveltejs/kit";

export async function load({locals}) {


   
    if (!locals.user) {
        throw redirect(303, '/books')
    }

    return {
        myStories: locals.myStories
    }
    
  }