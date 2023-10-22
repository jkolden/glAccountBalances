let axios = require("axios");

//gets the GL balance
function getBalance(faUrl, accessToken, userName, accountName) {
  var config = {
    method: "get",
    url:
      faUrl +
      `/fscmRestApi/resources/11.13.18.05/ledgerBalances?onlyData=true&finder=AccountGroupBalanceFinder;accountGroupName=IT Department Expenses,accountName=${accountName},accountingPeriod=SEP-24,currency=USD,ledgerName=Progress US Primary Ledger`,
    headers: {
    // 'Authorization': 'Basic aGFyb2xkLndpbHNvbjpwPzdiRT8yZg=='
    //'Authorization': 'Basic aGFyb2xkLndpbHNvbjprWlI5ZF4zIw==',

       Authorization: "Bearer " + accessToken,
    },
  };

  return axios(config)
    .then((response) => {
      let balance = response.data.items[0].ActualBalance;
      let budget = response.data.items[0].BudgetBalance;

      /*
      let assignmentId = response.data.items[0].assignments[0].AssignmentId;
      let personId = response.data.items[0].PersonId;

      obj.assignmentId = assignmentId;
      obj.personId = personId;
      */

      let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        maximumFractionDigits: 0, 
        minimumFractionDigits: 0, 
        currency: 'USD',
      });

      function nvl(value1,value2){
        if (value1 == '#MISSING'||value1 === 'Infinity'||value1 === 'NaN'|| typeof(value1) === 'undefined')
           return value2;
        
        return parseInt(value1);
     }

     let pct = (nvl(balance,0)/nvl(budget,0) * 100).toFixed(2);

      let objResponse = {
        pctConsumed: (pct),
        balance: USDollar.format(nvl(balance,0)),
        budget: USDollar.format(nvl(budget,0)),
      }

      return objResponse;

    })
    .catch(function (error) {
      return error.response.status;
    });
}


module.exports = {
  doStuff: async (obj) => {

    let objResponse = await getBalance(
      obj.url,
      obj.accessToken,
      obj.userName,
      obj.accountName
    );
    
    return objResponse;
  },
};
