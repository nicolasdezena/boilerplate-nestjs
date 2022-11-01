import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from './users.interface';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop(String)
  name: string;

  @Prop(String)
  email: string;

  @Prop(String)
  role: UserRole;

  @Prop(String)
  password?: string;

  @Prop(new Types.ObjectId())
  companyId: Types.ObjectId;

  @Prop(Array)
  storeIds: Types.ObjectId[];

  @Prop(String)
  ressetEmailCode?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
