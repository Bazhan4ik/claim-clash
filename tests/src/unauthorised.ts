import * as p from "puppeteer";


/*

Checking for buttons that are not supposed to be shown to unauthorised users.

*/

async function main() {

  const browser = await p.launch({ headless: false });

  const page = await browser.newPage();


}