import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Claim, ClaimSchema, Topic, TopicSchema } from './models';

@Module({
  imports: [
    // MongooseModule.forRoot("mongodb+srv://bazhantt:1H7OPLpizWzasmlR@cluster0.l72csly.mongodb.net/?retryWrites=true&w=majority", { dbName: "nottest" }),
    MongooseModule.forRoot("mongodb+srv://bazhantt:1H7OPLpizWzasmlR@cluster0.l72csly.mongodb.net/?retryWrites=true&w=majority"),
    MongooseModule.forFeature([{ name: Topic.name, schema: TopicSchema }, { name: Claim.name, schema: ClaimSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}