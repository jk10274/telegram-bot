import bodyParser from "body-parser";
import express from "express";
import { Telegraf } from "telegraf";

const DSB = require('dsbapi');

/*
  TELEGRAM_BOT_TOKEN is an environment variable
  that should be configured on Railway
*/
if (!process.env.TELEGRAM_BOT_TOKEN) throw new Error("Please add a bot token");
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const dsb = new DSB('299301', '20dsbADS21');

dsb.fetch()
	.then(data => {
		const timetables = DSB.findMethodInData('timetable', data);
		const tiles = DSB.findMethodInData('tiles', data);

		// Work with it
	})
	.catch(e => {
		// An error occurred :(
		console.log(e);
	});

bot.start(ctx => ctx.reply("Welcome"));
bot.hears("hello", ctx => {
  ctx.reply("Hey there!");
});

bot.launch();

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.get("/", async (req, res) => {
  res.json({ Hello: "World" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
