import p, { Page } from "puppeteer";
import { MongoClient } from "mongodb";
import "dotenv/config";
import { cleanup } from "./clean";
import { account } from "./utils/account";


  
main();


async function main() {
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  await client.connect();
  
  await cleanup(client);

  try {
    await bot(client);
    // await bot(client);
    // await bot(client);
    // await bot(client);
    // await bot(client);
  } catch (e) {
    // await cleanup(client);
    console.log(e);
  }

  console.log("done");
}


async function bot(client: MongoClient) {




  const browser = await p.launch({ headless: false });

  const page = await browser.newPage();

  await page.goto("http://localhost:4200");





  // SIGNING UP

  await account(page, client);



  // APPROVING A CLAIM

  const topics = await page.$$(".topic");

  if(topics && topics.length > 0) {
    await page.focus(".topic:first-of-type")
    await page.keyboard.type("\n");

    await page.waitForNavigation();
  } else {
    throw new Error("No topics found");
  }

  await page.click("#claims");

  await page.waitForSelector(".claim");

  const claims = await page.$$(".claim");

  if (claims && claims.length > 0) {
    await page.focus(".claim:first-of-type");
    await page.keyboard.type("\n");
  } else {  
    throw new Error("No claims found");
  }

  await page.focus("#approve");
  await page.keyboard.type("\n");


  


}