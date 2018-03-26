const slack = require("slack");
const env = require("node-env-file");
const pretty = require("prettysize");
const moment = require("moment");
env(".env");
const token = process.env.SLACK_BOT_TOKEN;

const giveTimes = () => {
  return [
    {
      een_week: moment().subtract(7, "days")
    },
    {
      twee_weken: moment().subtract(14, "days")
    }
  ];
};

const toTime = (photoTime, times) => {
  let props = [];
  giveTimes().forEach(item => {
    const my_key = Object.keys(item)[0];
    // console.log(photoTime);
    // console.log(my_key);
    console.log(photoTime - item[my_key]);
    if ( photoTime < item[my_key] ) {
      console.log(`--> ${my_key}`);
      props.push(my_key);
    }
  });
  return props;
};

console.clear();
(async () => {
  const auth = await slack.auth.test({ token: token });
  console.log(`${auth.user} with id ${auth.user_id}`);
  const files = await slack.files.list({ token: token, user: auth.user_id });
  let pic = [];
  let total = 0;
  files.files.forEach(item => {
    const size = pretty(item.size);
    const mom = moment.utc(item.created * 1000);
    const tijd = mom.fromNow();
    const diff = moment().valueOf() - mom;
    item.prop = toTime(moment(item.created * 1000));
    total = item.size + total;
    // console.log(diff);
    console.log(`${item.id}\t ${tijd}\t ${size} `);
    console.log();
  });
  console.log();
  console.log(`${auth.user} total size ${pretty(total)}`);
})();
