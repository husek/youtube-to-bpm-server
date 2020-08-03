import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
  bpm: string;
  videoId: string;
}

const VideoSchema: Schema = new Schema({
  videoId: { type: String, required: true, unique: true },
  bpm: { type: String, required: true },
});

export default mongoose.model<IVideo>('Video', VideoSchema);