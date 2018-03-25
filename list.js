const slack = require("slack");
const env = require("node-env-file");
const pretty = require("prettysize");
const moment = require("moment");

console.log(moment());
console.clear();

env(".env");
const token = process.env.SLACK_BOT_TOKEN;
// const authToken = process.env.SLACK_TOKEN
// const botToken = process.env.SLACK_BOT_TOKEN

(async () => {
  const auth = await slack.auth.test({ token: token });
  console.log(`${auth.user} with id ${auth.user_id}`);
  const files = await slack.files.list({ token: token, user: auth.user_id });
  files.files.forEach(item => {
    const size = pretty(item.size);
    const tijd = moment.utc(item.created * 1000).fromNow();
    console.log(`${item.id}\t ${tijd}\t ${size} `);
  });
})();