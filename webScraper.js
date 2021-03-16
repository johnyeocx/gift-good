const puppeteer = require("puppeteer");
const { pageEvaluator } = require("patang");

async function extractDetailsFromPage(url) {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--no-zygote",
      "--no-default-browser-check",
      "--bwsi",
      "--disable-dev-shm-usage",
      "--disable-infobars",
      "--hide-scrollbars",
    ],
  });

  const page = await browser.newPage();

  //   await page.goto(exampleFlpktUrl, { waitUntil: "networkidle0" });
  //   console.log("Flipkart Product Details");
  //   console.log(await pageEvaluator.evaluateProductDetails(page, "flipkart"));
  try {
    await page.goto(url, { waitUntil: "networkidle0" });
    const result = await pageEvaluator.evaluateProductDetails(page, "amazon");
    console.log(result);
    await page.close();
    await browser.close();
    return result;
  } catch (error) {
    console.log("unable to fetch from URL");
    return -1;
  }
}
module.exports = { extractDetailsFromPage };

// invoking the function
// extractDetailsFromPage("exampleAmznUrl").then((res) => console.log(res));
