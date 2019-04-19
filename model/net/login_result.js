class LoginResult {
    constructor(isSuccess, jwt) {
        this.isSuccess = isSuccess;
        this.jwt = jwt;
    }
}

module.exports = LoginResult