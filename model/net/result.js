class Result {
    constructor(isSuccess, data, msg) {
        this.isSuccess = isSuccess;
        this.data = data;
        this.msg = msg;
    }
}

module.exports = Result;