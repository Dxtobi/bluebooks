import mongoose, { Document, Model } from 'mongoose';

interface Rating extends Document {
    bookId: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    score: number;
    createdAt: Date;
    updatedAt: Date;
    _id: string;
}

type RatingModel = Model<Rating>

const ratingSchema = new mongoose.Schema<Rating, RatingModel>(
    {
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Replace 'User' with the actual user model
            required: true,
        },
        score: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
    },
    {
        timestamps: true,
    }
);

const RatingModel: RatingModel = mongoose.models.Rating ?? mongoose.model<Rating, RatingModel>('Rating', ratingSchema);

export default RatingModel;
