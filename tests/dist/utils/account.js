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
Object.defineProperty(exports, "__esModule", { value: true });
exports.account = void 0;
function account(page, client) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.goto("http://localhost:4200");
        yield page.click("#sign-up");
        const email = `${generateRandomString()}@gmail.com`;
        console.log(email);
        // await page.waitForNavigation();
        // await page.waitForSelector("#i-email");
        yield page.type("#i-email", email);
        yield page.type("#i-password", "password");
        yield page.focus("#submit");
        yield page.keyboard.type("\n");
        // const registrationSubmitButton = await page.$("#submit");
        // console.log(registrationSubmitButton);
        // if (!registrationSubmitButton) {
        //   throw new Error("Registration submit button not found");
        // }
        // await registrationSubmitButton.click();
        // await page.waitForNavigation({ timeout: 2000 });
        yield page.waitForSelector("#code", { timeout: 2000 });
        const code = yield getCode(client, email);
        yield page.type("#code", code);
    });
}
exports.account = account;
function getCode(client, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield client.db("test").collection("users").findOne({ email });
        console.log(user);
        return user === null || user === void 0 ? void 0 : user.registration.code;
    });
}
function generateRandomString() {
    // Define the characters that can be included in the string
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // Generate a random length between 4 and 10
    const length = Math.floor(Math.random() * (10 - 4 + 1)) + 4;
    let result = '';
    // Generate a random string of the determined length
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
