import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";



@Schema()
export class Topic {
  @Prop() title: string;
  @Prop() id: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId }) _id: ObjectId;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);