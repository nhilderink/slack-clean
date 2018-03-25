const slack = require("slack");
const env = require("node-env-file");
env(".env");
const token = process.env.SLACK_BOT_TOKEN;

// let authToken = process.env.SLACK_TOKEN
// let botToken = process.env.SLACK_BOT_TOKEN

slack.files
  .list({ token:token })
  .then(out => {
    out.files.forEach((item) => {
      console.log(`user: ${item.user}`);
    });
    // console.log(out);
  })
  .catch(out => {
    console.log(out);
  });
