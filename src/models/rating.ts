import mongoose, { Document, Model } from 'mongoose';

interface Rating extends Document {
    book: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    value: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
    _id: string;
}

type RatingModel = Model<Rating>

const ratingSchema = new mongoose.Schema<Rating, RatingModel>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
        value: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
        },
    },
    {
        timestamps: true,
    }


);

const RatingModel: RatingModel = mongoose.models.Rating ?? mongoose.model<Rating, RatingModel>('Rating', ratingSchema);

export default RatingModel;
