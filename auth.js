const slack = require("slack");
const env = require("node-env-file");
const pretty = require("prettysize");
const moment = require("moment");

console.log(moment());

env(".env");
const token = process.env.SLACK_BOT_TOKEN;

// let authToken = process.env.SLACK_TOKEN
// let botToken = process.env.SLACK_BOT_TOKEN
(async () => {
  const auth = await slack.auth.test({ token: token });
  console.log(`${auth.user} with id ${auth.user_id}`);
  const files = await slack.files.list({ token: token, user: auth.user_id });
  files.files.forEach(item => {
    // console.log(item);
    // console.log(pretty(item.size));
    // console.log(item.created);
    const size = pretty(item.size);
    const tijd = moment.utc(item.created * 1000).fromNow();
    console.log(`${size} \t\t-> ${tijd} `);
  });
})();
