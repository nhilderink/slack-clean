const Slack = require("slack");
const env = require("node-env-file");
env(".env");
const token = process.env.SLACK_BOT_TOKEN;
const bot = new Slack({ token });

// logs {args:{hyper:'card'}}
// bot.api.test({hyper:'card'}).then(console.log)

console.log(token);

bot.channels
  .list({ token: token })
  .then(out => {
    console.log("then()");
    console.log(out);
  })
  .catch(e => {
    console.log("catch");
    console.log(e);
  });
