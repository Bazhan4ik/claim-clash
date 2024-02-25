import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { createJWT, verifyJWT } from 'src/utils/auth';
import * as crypto from 'crypto';
import { Response, Request, } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/models';
import { Model } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) { };


  @Post("register")
  async register(@Body() body: { email: string, password: string }, @Res() res: Response) {
    const { email, password } = body;

    if (!email || !password) {
      return res.send({ code: "missing_fields", message: "Missing Fields", success: false });
    }

    const existingUser = await this.userModel.findOne({ email }).exec();

    if (existingUser) {
      if (!existingUser.registration.registered) {
        existingUser.registration.code = createCode();
        existingUser.registration.token = crypto.randomBytes(64).toString("hex");
        await existingUser.save();
        return res.send({ code: "email_not_confirmed", message: "Email Not Confirmed", success: false, token: existingUser.registration.token });
      }
      return res.send({ code: "email_registered", message: "Email Already Registered", success: false });
    }

    if (!checkEmail(email)) {
      return res.send({ code: "invalid_email", message: "Invalid Email Address", success: false });
    }

    const token = crypto.randomBytes(64).toString("hex");
    const code = createCode();


    const user = new this.userModel({ email, password, registration: { token, code } });

    await user.save();

    res.send({ code: "success", success: false, token });
  }

  @Post("code")
  async confirmEmail(@Body() body: { token: string, code: string }, @Res() res: Response) {
    const { token, code } = body;

    if (!token || !code || code.length != 6) {
      return res.send({ code: "missing_fields", message: "Missing Fields", success: false });
    }

    const user = await this.userModel.findOne({ "registration.token": token }).exec();

    if (!user) {
      return res.send({ code: "invalid_token", message: "Invalid Token", success: false });
    }

    if (user.registration.code !== code) {
      return res.send({ code: "invalid_code", message: "Invalid Code", success: false });
    }

    const auth = {
      token: crypto.randomBytes(64).toString("hex"),
    }

    user.auth = { ...auth, expires: Date.now() + 36000000 };
    user.registration.registered = true;

    await user.save();


    const jwt = createJWT(auth, Date.now() + 36000000);

    return res.send({ code: "success", success: true, token: jwt, user: { _id: user._id } });
  }

  @Get("me")
  async me(@Req() req: Request, @Res() res: Response) {
    const jwt = req.headers["authorization"];

    if (!jwt || typeof jwt != "string") {
      return res.status(422).send({ reason: "invalid_token" });
    }

    const data = verifyJWT(jwt as string);

    console.log("DECODED TOKEN: ", data);

    const auth = {
      token: crypto.randomBytes(64).toString("hex"),
    }

    console.log("NEW TOKEN: ", auth.token);

    const jwt2 = createJWT(auth, Date.now() + 36000000);

    const user = await this.userModel.findOneAndUpdate({ "auth.token": data.token }, { $set: { "auth": { ...auth, expires: Date.now() + 36000000 } } }).exec();

    if (!user) {
      return res.status(404).send({ reason: "user_not_found" });
    }


    return res.send({ user: { _id: user._id }, newToken: jwt2, success: true });
  }


}





function checkEmail(email: string) {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function createCode() {
  return crypto.randomInt(100000, 999999).toString(10);
}