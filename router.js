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

router.get("/", (req, res) => {
  res.send("server is up and running");
});

router.post("/generate", async (req, res) => {
  const url = req.body.url;
  console.log(url);
  // if (urlData.url1) {
  // try {

  const data = await extractDetailsFromPage(url);
  // const result = "unable to fetch from URL";
  if (data === -1) {
    res.status(400).json("no result found");
  }
  res.status(200).json(data);

  // if (data === -1) {

  // } else {
  //   const result = data;
  //   res.status(404).json(result);
  // }

  // const res2 = await extractDetailsFromPage(urlData.url2);
  // if (res2 === -1) {
  //   result.push({
  //     title: "unable to fetch from URL2",
  //     preference: 1,
  //     found: false,
  //   });
  // } else {
  //   result.push({ ...res2, preference: 2, found: true });
  // }
  // const res3 = await extractDetailsFromPage(urlData.url3);
  // if (res3 === -1) {
  //   result.push({
  //     title: "unable to fetch from URL3",
  //     preference: 1,
  //     found: false,
  //   });
  // } else {
  //   result.push({ ...res3, preference: 2, found: true });
  // }
  // const res4 = await extractDetailsFromPage(urlData.url4);
  // if (res4 === -1) {
  //   result.push({
  //     title: "unable to fetch from URL4",
  //     preference: 1,
  //     found: false,
  //   });
  // } else {
  //   result.push({ ...res4, preference: 2, found: true });
  // }
  // const res5 = await extractDetailsFromPage(urlData.url5);
  // if (res5 === -1) {
  //   result.push({
  //     title: "unable to fetch from URL5",
  //     preference: 1,
  //     found: false,
  //   });
  // } else {
  //   result.push({ ...res5, preference: 2, found: true });
  // }
  // console.log(result);

  // } catch {
  //   console.log(error);
  //   res.status(400).json("there is an error");
  // }
});

module.exports = router;
