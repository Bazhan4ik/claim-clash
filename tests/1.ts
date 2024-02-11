import p from "puppeteer";

main();

async function main() {
  const browser = await p.launch({ headless: false });

  const page = await browser.newPage();


  await page.goto("http://localhost:4200");
}