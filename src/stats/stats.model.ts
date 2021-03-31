import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export const StatsSchema = new mongoose.Schema(
  {
    hash_link: { type: String, required: true },
    number_acess: { type: Number, required: true },
    ip: { type: String, required: true },
    geo: { type: String, required: true },
  },
  { timestamps: true, collection: 'stats' },
);

export interface Stats extends Document {
  hash_link: string;
  number_acess: string;
  ip: string;
  geo: string;
}
