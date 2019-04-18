const TextUtils = require('../utils/text_utils')
const RegisterResult = require('../model/net/register_result')
const BaseService = require('./base_service.js')
const userDao = require('../dao/user_dao')
const md5 = require('md5')

class AccoutService extends BaseService {
    constructor() {
        super(userDao)
    }

    checkEmailAndPasswd(email, passwd, ctx) {
        if (email == null || passwd == null) {
            return new RegisterResult(false, false, true, false)
        }
        if (!TextUtils.isEmail(email)) {
            return new RegisterResult(false, false, true, true)
        }
        if (passwd.length < 6) {
            return new RegisterResult(false, true, true, false);
        }
        return new RegisterResult(true, true, true, true);
    }


    async isEmailDuplicate(email) {
        let result = await this.baseFindByFilter(['id'], {email: email})
        if (result.length != 0) {
            return true;
        }
        return false;
    }

    async registerAccount(email, pwd) {
        try {
            await this.baseCreate({email: email, password: md5(pwd), moment: Date.now()})
            return true
        } catch (e) {
            return false;
        }


    }


    async login(email, pwd) {
        let result = await this.baseFindByFilter(['id'], {email: email, password: md5(pwd)})
        console.log(result)
        return result.length > 0;
    }
}

module.exports = AccoutService;