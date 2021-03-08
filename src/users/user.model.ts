import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  acess_token : { type: String, required: true },
});

export interface User {
  id: string;
  email: string;
  acess_token: string;
}