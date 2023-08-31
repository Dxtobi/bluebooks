import mongoose, { Document, Model } from 'mongoose';

interface Comment extends Document {
  bookId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  content: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

type CommentModel = Model<Comment>

const commentSchema = new mongoose.Schema<Comment, CommentModel>(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      // required: true,
    },

    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Replace 'User' with the actual user model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel: CommentModel = mongoose.models.Comment ?? mongoose.model<Comment, CommentModel>('Comment', commentSchema);

export default CommentModel;
