const slack = require("slack");
const env = require("node-env-file");
const pretty = require("prettysize");
const moment = require("moment");
console.log(moment());
console.clear();

env(".env");
const token = process.env.SLACK_BOT_TOKEN;

const getUser = async () => {
  return await slack.auth.test({ token: token });
};

const getSize = async id => {
  const files = await slack.files.list({ token: token, user: id });
  let output = "";
  let total = 0;
  files.files.forEach(item => {
    const size = pretty(item.size);
    const mom = moment.utc(item.created * 1000);
    const tijd = mom.fromNow();
    const diff = moment().valueOf() - mom;
    total = item.size + total;
    // console.log(diff);
    output += `${item.id}\t ${tijd}\t ${size}\n`;
  });
  output += `total size ${pretty(total)}`;
  return output;
};

const post = async text => {
  return await slack.chat.postMessage({
    token: token,
    channel: "bottestfield",
    text: text
  });
};

(async () => {
  const user = await getUser(); // user_id , user
  const usersize = await getSize(user.user_id);
  await post(`${user.user} stats:\n${usersize}`)
  console.log(usersize);
})();
