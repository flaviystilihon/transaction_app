new Vue({
    el: '#operations',
    data() {
        return {
            input_sum: 0,
            transactions: [],
            account: 0,
            credit_error_is_seen: false
        };
    },
    methods: {
        sendCredit: function () {
            this.credit_error_is_seen = false;

            axios.post('http://127.0.0.1:3000/transactions/credit', {
                sum: this.input_sum
            }).then((response) => {
                if (response.data.status == 1) {
                    this.updateTransactionsList();
                    this.updateAccount();
                } else {
                    this.credit_error_is_seen = true;
                }
            }, (error) => {});
        },
        sendDebit: function () {
            this.credit_error_is_seen = false;

            axios.post('http://127.0.0.1:3000/transactions/debit', {
                sum: this.input_sum
            }).then((response) => {
                this.updateTransactionsList();
                this.updateAccount();
            }, (error) => {});
        },

        updateTransactionsList() {
            axios.get('http://127.0.0.1:3000/transactions/list')
                .then(response => {
                    let transactionsJSON = response.data;
                    let transactions = transactionsJSON.map((transaction) => {
                        return JSON.parse(transaction);
                    })
                    this.transactions = transactions;
                }).catch((error) => {
                    console.log(error);
                });
        },

        updateAccount() {
            axios.get('http://127.0.0.1:3000/transactions/account')
                .then(response => {
                    this.account = response.data;
                }).catch((error) => {
                    console.log(error);
                });
        }
    },

    mounted() {
        this.updateTransactionsList();
        this.updateAccount();
    }
});