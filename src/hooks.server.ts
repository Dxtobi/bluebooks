

import UserModel from './models/user';
import BookModel from './models/books';
import RatingModel from './models/rating';
import { serializeNonPOJOs } from '$lib/utils/utils';
import { dbConnect, dbDisconnect } from '$lib/utils/db';


export const handle = async ({event, resolve}) => {
  try {
    // Connect to the MongoDB database and wait for the connection to be established
    await dbConnect();
   
    // Assign the UserModel to event.locals.UserModel
      event.locals.USER = UserModel;
      event.locals.BOOK = BookModel;
      event.locals.RATING = RatingModel;
    
    // Find the user based on the session
    const session = event.cookies.get('session');
 
    if (!session) {
      // If there is no session, load the page as normal
      return await resolve(event);
    }
   
    const user = await event.locals.USER.findOne({ userAuthToken: session }).exec();
   
    // If `user` exists, set `event.locals.user`
      if (user) {
        console.log(user,user._doc )
      event.locals.user = serializeNonPOJOs(user._doc);
    } 

    const response = await resolve(event);
    await dbDisconnect();
    return response;
  } catch (error) {
    console.log("from hooks:", error);
    throw error;
  }
};
