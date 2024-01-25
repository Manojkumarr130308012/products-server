import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  strict: false,
})
export class User {}

export const UserSchema = SchemaFactory.createForClass(User);