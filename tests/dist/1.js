"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const mongodb_1 = require("mongodb");
require("dotenv/config");
const clean_1 = require("./clean");
const account_1 = require("./utils/account");
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield mongodb_1.MongoClient.connect(process.env.MONGODB_URI);
        yield client.connect();
        yield (0, clean_1.cleanup)(client);
        try {
            yield bot(client);
            // await bot(client);
            // await bot(client);
            // await bot(client);
            // await bot(client);
        }
        catch (e) {
            // await cleanup(client);
            console.log(e);
        }
        console.log("done");
    });
}
function bot(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({ headless: false });
        const page = yield browser.newPage();
        yield page.goto("http://localhost:4200");
        // SIGNING UP
        yield (0, account_1.account)(page, client);
        // APPROVING A CLAIM
        const topics = yield page.$$(".topic");
        if (topics && topics.length > 0) {
            yield page.focus(".topic:first-of-type");
            yield page.keyboard.type("\n");
            yield page.waitForNavigation();
        }
        else {
            throw new Error("No topics found");
        }
        yield page.click("#claims");
        yield page.waitForSelector(".claim");
        const claims = yield page.$$(".claim");
        if (claims && claims.length > 0) {
            yield page.focus(".claim:first-of-type");
            yield page.keyboard.type("\n");
        }
        else {
            throw new Error("No claims found");
        }
        yield page.focus("#approve");
        yield page.keyboard.type("\n");
    });
}
