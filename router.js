const express = require("express");
const { extractDetailsFromPage } = require("./webScraper.js");

const router = express.Router();

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
