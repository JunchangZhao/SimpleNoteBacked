class RegisterResult {

    constructor(isSuccess, isAccountValid, isAccountDuplicate, isPasswdValid) {
        this.isSuccess = isSuccess;
        this.isAccountValid = isAccountValid;
        this.isAccountNotDuplicate = isAccountDuplicate;
        this.isPasswdValid = isPasswdValid;

    }

}

module.exports = RegisterResult;