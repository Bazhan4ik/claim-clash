import { MongoClient } from "mongodb";
import * as p from "puppeteer";



export async function account(page: p.Page, client: MongoClient) {
  
  await page.goto("http://localhost:4200");

  await page.click("#sign-up");

  const email = `${generateRandomString()}@gmail.com`;

  console.log(email);

  // await page.waitForNavigation();
  
  // await page.waitForSelector("#i-email");

  await page.type("#i-email", email);
  await page.type("#i-password", "password");

  await page.focus("#submit");
  await page.keyboard.type("\n");
  // const registrationSubmitButton = await page.$("#submit");
  // console.log(registrationSubmitButton);
  // if (!registrationSubmitButton) {
  //   throw new Error("Registration submit button not found");
  // }
  // await registrationSubmitButton.click();

  // await page.waitForNavigation({ timeout: 2000 });

  await page.waitForSelector("#code", { timeout: 2000 });

  const code = await getCode(client, email);

  await page.type("#code", code);
}





async function getCode(client: MongoClient, email: string) {
  
  const user = await client.db("test").collection("users").findOne({ email });

  console.log(user);

  return user?.registration.code;
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
