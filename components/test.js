let helper = require("./postHelper.js");

let obj = {
  url: "https://fa-esev-dev20-saasfademo1.ds-fa.oraclepdemos.com",
  accessToken: 1,
  userName: "HAROLD.WILSON",
  accountName: 'Printing'

}

helper.doStuff(obj).then((result) => {
  console.log(result);
});
