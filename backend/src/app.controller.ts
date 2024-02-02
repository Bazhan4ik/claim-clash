import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Claim, Topic } from './models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel(Claim.name) private claimModel: Model<Claim>,
    @InjectModel(Topic.name) private topicModel: Model<Topic>,
  ) { }

  @Get("topics")
  getHello() {
    return this.topicModel.find().exec();
  }

  @Post("claims/:topic")
  createClaim(@Req() req: Request, @Res() res: Response, @Param("topic") topicId: string) {
    console.log(req.body);

    const newClaim = new this.claimModel({ explanation: req.body.explanation, title: req.body.explanation, topic: topicId });
    newClaim.save();

    res.send({ accepted: true });
  }

  @Get("claims/:topic")
  async getClaims(@Param("topic") topicId) {
    const claims = await this.claimModel.find({ topic: topicId }).exec();

    console.log(claims);

    return claims;
  }



}
