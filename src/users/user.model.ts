import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    acess_token: { type: String, required: true },
  },
  { timestamps: true , collection:'users' },
);

export interface User extends Document {
  email: string;
  acess_token: string;
}
