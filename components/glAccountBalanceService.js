const postHelper = require("./postHelper.js");

("use strict");

// You can use your favorite http client package to make REST calls, however, the node fetch API is pre-installed with the bots-node-sdk.
// Documentation can be found at https://www.npmjs.com/package/node-fetch
// Un-comment the next line if you want to make REST calls using node-fetch.
// const fetch = require("node-fetch");

module.exports = {
  
  metadata: () => ({
    name: "glAccountBalanceService",
    properties: {
      accessToken: { required: true, type: "string" },
      userName: { required: true, type: "string" },
      url: { required: true, type: "string" },
      accountName: { required: true, type: "string" }
    },
    supportedActions: ["success", "error"],
  }),
  invoke: (context, done) => {

    const url = context.properties().url;
    const accessToken = context.properties().accessToken;
    const userName = context.properties().userName;
    const accountName = context.properties().accountName;

  
    postHelper
      .doStuff({
        accessToken: accessToken,
        userName: userName,
        url: url,
        accountName: accountName
      })
      .then((result) => {

        if ( typeof(result) == 'number') {

          context.transition("error");
          done();

        } else {

          context.variable("balance", result.balance);
          context.variable("budget", result.budget);
          context.variable("pctConsumed", result.pctConsumed);
          context.transition("success");
          done();

        }

        
    
      });
  },
};
