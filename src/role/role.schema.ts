import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema({
  timestamps: true,
  strict: false,
})
export class Role {}

export const RoleSchema = SchemaFactory.createForClass(Role);