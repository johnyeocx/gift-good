const express = require("express");
// const { extractDetailsFromPage } = require("./webScraper.js");

const router = express.Router();

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

router.get("/", (req, res) => {
  res.send("server is up and running");
});

router.post("/generate", async (req, res) => {
  try {
    console.log("testing scraping");
    const url = req.body.url;
    console.log(url);
    const data = await extractDetailsFromPage(url);
    // const result = "unable to fetch from URL";
    if (data === -1) {
      res.status(400).json("no result found");
    }
    res.status(200).json(data);
  } catch (error) {
    console.log("error has occured");
  }
});

module.exports = router;
