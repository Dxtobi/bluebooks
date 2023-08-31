import mongoose, { Document, Model } from 'mongoose';

interface User extends Document {
  username: string;
  email: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  password: string;
  userAuthToken: string;
  liked: Array<mongoose.Schema.Types.ObjectId>;
}

type UserModel = Model<User>

const userSchema = new mongoose.Schema<User, UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    userAuthToken: {
      type: String,
      required: true,
    },
    liked: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: UserModel = mongoose.models.User ?? mongoose.model<User, UserModel>('User', userSchema);

export default UserModel;
