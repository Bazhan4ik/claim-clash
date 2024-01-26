import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("topics")
  getHello(): Topic[] {
    return [
      {
        title: "Ukraine War",
        _id: "hello"
      },
      {
        title: "COVID-19",
        _id: "hello"
      },
      {
        title: "January 6",
        _id: "hello"
      },
      {
        title: "Israel-Palestine War",
        _id: "hello"
      }
    ]
  }



}
