
import UserModel from './models/user';
import BookModel from './models/books';
import RatingModel from './models/rating';
import { serializeNonPOJOs } from '$lib/utils/utils';
import { dbConnect, dbDisconnect } from '$lib/utils/db';


export const handle = async ({event, resolve}) => {
  try {
    // Connect to the MongoDB database and wait for the connection to be established
    await dbConnect();
   
    // Assign the Models to event.locals....
    
    event.locals.USER = UserModel;
    event.locals.BOOK = BookModel;
    event.locals.RATING = RatingModel;
    // Find the user based on the session
    const session = event.cookies.get('session-book');
 
    if (!session) {
      // If there is no session, load the page as normal
      return await resolve(event);
    }
   
    const user = await UserModel.findOne({ userAuthToken: session }).select('_id username email points');
    const books  =serializeNonPOJOs( await BookModel.find({ author: user?._id }).sort({createdAt: -1}))
    
    //this is not neccesary with the new aproch but i would advice noot to change it just yet
   
    event.locals.myStories = books
    
    // If `user` exists, set `event.locals.user`
    if (user) {
     // console.log(user.username,'-----------------', books )
      event.locals.user = serializeNonPOJOs(user);
    } 

    const response = await resolve(event);
    await dbDisconnect();
    return response;
  } catch (error) {
    console.log("from hooks:", error);
    throw error;
  }
};
