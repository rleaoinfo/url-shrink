import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export const LinkSchema = new mongoose.Schema({
  hash_link: { type: String, required: true },
  url_source: { type: String, required: true },
  url_target: { type: String, required: true },
  uri : { type: String, required: true },
});

export interface Link extends Document{
  hash_link: string;
  url_source: string;
  url_target: string;
  uri: string;
}