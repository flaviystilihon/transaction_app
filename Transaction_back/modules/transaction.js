const _transaction_type = Symbol('type');
const _transaction_sum = Symbol('sum');

module.exports = class Transaction {
    constructor(type, sum) {
        this[_transaction_type] = type;
        this[_transaction_sum] = sum;
    }

    get type() { return this[_transaction_type]; };
    set type(newType) { this[_transaction_type] = newType;};
    get sum() { return this[_transaction_sum]; };
    set sum(newSum) { this[_transaction_sum] = newSum;};

    get JSON() {
        return JSON.stringify({
            type: this.type,
            sum: this.sum
        });
    }

    static fromJSON(json) {
        var data = JSON.parse(json);
        var transaction = new Transaction(data.type, data.sum);
        return transaction;
    }
}

