import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
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
  @Prop() topic: string;
  @Prop({ type: [mongoose.Types.ObjectId] }) approvers: ObjectId[];
  @Prop() points: number;
  // @Prop({ type: mongoose.Schema.Types.ObjectId }) _id: ObjectId;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);


@Schema()
export class Fact extends Claim {

  @Prop({ type: Date, default: Date.now() }) approved: Date;

}

export const FactSchema = SchemaFactory.createForClass(Fact);


@Schema()
export class User {
  @Prop() email: string;
  @Prop() password: string;
  @Prop(raw({
    token: { type: String },
    expires: { type: Date, default: Date.now() + 36000000 },
    registered: { type: Boolean, default: false },
    code: { type: String, },
  })) registration: {
    token: string;
    expires: number;
    registered: boolean;
    code: string;
  };

  @Prop(raw({
    token: { type: String },
    expires: { type: Date, default: Date.now() + 36000000 },
  })) auth: { token: string; expires: number; }
}

export const UserSchema = SchemaFactory.createForClass(User);
