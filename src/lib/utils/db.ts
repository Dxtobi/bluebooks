import mongoose from 'mongoose';
import { MONGO_URL } from '$env/static/private';

interface MongoConnectionState {
  isConnected: number;
}

const mongoConnection: MongoConnectionState = {
  isConnected: 0,
};

export const dbConnect = async () => {
  try {
    if (mongoConnection.isConnected === 1) {
      console.log('Connection already established');
      return;
    }

    if (mongoose.connections.length > 0) {
      mongoConnection.isConnected = mongoose.connections[0].readyState;
      if (mongoConnection.isConnected === 1) {
        console.log('Already connected');
        return;
      }

      await mongoose.disconnect();
    }

    await mongoose.connect(MONGO_URL ?? '');
    mongoConnection.isConnected = 1;
    console.log('Connected to MongoDB', MONGO_URL ?? '');
  } catch (error) {
    console.log(error);
  }
};

export const dbDisconnect = async () => {
  if (process.env.NODE_ENV === 'development') return;
  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();
  mongoConnection.isConnected = 0;
  console.log('Disconnected from MongoDB');
};
