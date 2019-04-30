const Transaction = require('./transaction');

class AccountLowError extends Error {}

// some hardcoded transactions created for easier testing
var transactions = [];

var counter = 0;

exports.add_transaction = async function(type, sum) {

    if(type == "credit") {
        let general_account = await this.account();

        if((general_account - sum) < 0) {
            throw new AccountLowError(`Credit transaction is impossible with the sum of ` + sum);
        }
    }

    // Create new procedure with key equal to current counter number (for the simplicity) 
    const new_transaction = new Transaction(type, parseInt(sum));
    transactions[counter] = new_transaction;
    counter++;

    return new_transaction;
};

exports.find_transaction = async function(key) {
    if(transactions[key]) return transactions[key];
    else throw new Error(`Transaction ${key} does not exist`);
};

exports.get_all_transactions = async function() {

    let keylist = await this.keylist();

    let keyPromises = keylist.map((key) => {
      return this.find_transaction(key);
    });

    let transaction_list = await Promise.all(keyPromises);
    return transaction_list;
}

exports.account = async function account() {
    
    general_account = 0;

    transactions.forEach((transaction) => {
        if(transaction.type == "debit") {
            general_account += transaction.sum;
        } else if (transaction.type == "credit") {
            general_account -= transaction.sum;
        }
    })

    return general_account; 
};

exports.keylist = async function keylist() {return Object.keys(transactions); };
exports.count = async function() {return transactions.length; };

exports.AccountLowError = AccountLowError;