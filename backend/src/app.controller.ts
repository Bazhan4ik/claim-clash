import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Topic } from './models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel(Topic.name) private topicModel: Model<Topic>
  ) { }

  @Get("topics")
  getHello() {

    return this.topicModel.find().exec();

    // return [
    //   {
    //     title: "Ukraine War",
    //     _id: "hello"
    //   },
    //   {
    //     title: "COVID-19",
    //     _id: "hello"
    //   },
    //   {
    //     title: "January 6",
    //     _id: "hello"
    //   },
    //   {
    //     title: "Israel-Palestine War",
    //     _id: "hello"
    //   }
    // ]
  }



}
