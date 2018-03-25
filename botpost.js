const slack = require("slack");
const env = require("node-env-file");
const pretty = require("prettysize");
const moment = require("moment");

console.log(moment());
console.clear();

env('.env');
const token = process.env.SLACK_BOT_TOKEN;
// const authToken = process.env.SLACK_TOKEN
// const botToken = process.env.SLACK_BOT_TOKEN

(async () => {
  const files = await slack.chat.postMessage({ token: token, channel: 'bottestfield', text: 'Hello Slack bot testje from @popcorn' });
  console.log(files);
})();
