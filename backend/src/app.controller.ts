import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Claim, Fact, Topic, User } from './models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request, Response } from 'express';
import * as crypto from "crypto";
import { createJWT, verifyJWT } from './utils/auth';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel(Claim.name) private claimModel: Model<Claim>,
    @InjectModel(Topic.name) private topicModel: Model<Topic>,
    @InjectModel(Fact.name) private factModel: Model<Fact>,
  ) { }

  @Get("topics")
  getHello() {
    return this.topicModel.find().exec();
  }

  @Post("claims/:topic")
  createClaim(@Req() req: Request, @Res() res: Response, @Param("topic") topicId: string) {

    const newClaim = new this.claimModel({ explanation: req.body.explanation, title: req.body.title, topic: topicId });
    newClaim.save();

    res.send({ accepted: true });
  }

  @Get("claims/:topic")
  async getClaims(@Param("topic") topicId) {
    const claims = await this.claimModel.find({ topic: topicId }).exec();

    return claims;
  }

  @Get("topics/:topic/claims/:claim")
  async getClaim(@Param("topic") topicId: string, @Param("claim") claimId: string) {
    const claim = await this.claimModel.findOne({ _id: claimId }).exec();

    return claim;
  }

  @Post("topics/:topic/claims/:claim/approve")
  async approveClaim(@Param("topic") topicId: string, @Param("claim") claimId: string) {
    const claim = await this.claimModel.findById(claimId).exec();
    // const claim = await this.claimModel.findByIdAndUpdate(claimId, { $inc: { "points": 1 }, $push: { approvers: '' } }).exec();



    // const swap = new this.factModel({ ...claim.toObject() })

    // swap.save();

    return { approved: true };
  }


  @Get("facts/:topic")
  async getFacts(@Param("topic") topicId: string) {
    const facts = await this.factModel.find().exec();

    return facts
  }


}


