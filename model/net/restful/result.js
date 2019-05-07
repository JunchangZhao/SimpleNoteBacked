class Result {
    constructor(isSuccess, data, msg) {
        this.isSuccess = isSuccess;
        this.data = data;
        this.msg = msg;
    }
}

class SuccessResult extends Result {
    constructor(data) {
        super(true, data, "")
    }

}

module.exports = {Result, SuccessResult};