import mongoose, { Document, Model } from 'mongoose';

interface Post extends Document {
    title: string;
    content: string;
    image: string;
    user: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    _id: string;
}

type PostModel = Model<Post>

const postSchema = new mongoose.Schema<Post, PostModel>(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const PostModel: PostModel = mongoose.models.Post ?? mongoose.model<Post, PostModel>('Post', postSchema);

export default PostModel;
