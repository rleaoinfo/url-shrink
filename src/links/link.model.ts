import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export const LinkSchema = new mongoose.Schema(
  {
    hash_link: { type: String, required: true },
    url_target: { type: String, required: true },
    uri: { type: String, required: true },
  },
  { timestamps: true, collection:'links' },
);

export interface Link extends Document {
  hash_link: string;
  url_target: string;
  uri: string;
}
