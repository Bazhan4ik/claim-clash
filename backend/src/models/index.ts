import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";



@Schema()
export class Topic {
  @Prop() title: string;
  @Prop() id: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId }) _id: ObjectId;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);


@Schema()
export class Claim {
  @Prop() title: string;
  @Prop() explanation: string;
  // @Prop({ type: mongoose.Schema.Types.ObjectId }) _id: ObjectId;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);