const express = require('express');
const router = express.Router();
const operations = require('../modules/operations');
const AccountLowError = operations.AccountLowError;

/* Get list of all transactions */
router.get('/list', async (req, res, next) => {
    
    let transaction_list = await operations.get_all_transactions();
    
    let JSON_transaction_list = transaction_list.map((transaction) => {
        return transaction.JSON;
    });

    res.send(JSON.stringify(JSON_transaction_list));
});

router.get('/account', async (req, res, next) => {
    let general_account = await operations.account();
    res.send(JSON.stringify(general_account));
})

// Add Debit
router.post('/debit', async (req, res, next) => {
    let transaction = await operations.add_transaction("debit", req.body.sum);
    res.send(transaction.JSON);
});

// Add Credit
router.post('/credit', async (req, res, next) => {

    let response = {
        status: 0,
        data: {}
    }

    try {
        let transaction = await operations.add_transaction("credit", req.body.sum);
        response.status = 1;
        response.data = transaction.JSON;
    } catch (error) {
        if(error instanceof AccountLowError) {
            response.status = 0;
        }
    }
    
    res.send(JSON.stringify(response));
});

// Get detailed information about transaction
router.get('/transaction_info', async (req, res, next) => {
    var transaction = await operations.find_transaction(req.query.key);
    res.send(transaction.JSON);
});

module.exports = router;