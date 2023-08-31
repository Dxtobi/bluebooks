import { redirect } from '@sveltejs/kit'


export const load = async ({ cookies, locals}) => {
  // we only use this endpoint for the api
  // and don't need to see the page
  
  locals.user = null


  cookies.set('session-book', '', {
    path: '/',
    expires: new Date(0),
  });

  cookies.delete('session-book', {
    path: '/',
    expires: new Date(0),
  })

  
  return {
    user:null
  }
}

export const actions = {
  default({ cookies, locals }) {
    // eat the cookie
    locals.user = null
    if (!locals.user) {
      throw redirect(303, '/auth')
    }
  
  
  
    cookies.set('session-book', '', {
      path: '/',
      expires: new Date(0),
    });
  
    cookies.delete('session-book', {
      path: '/',
      expires: new Date(0),
    })
  
    throw redirect(302, '/auth');
  },
}
