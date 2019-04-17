const router = require('koa-router')()
const Result = require('../model/net/result')
const RegisterResult = require('../model/net/register_result')
const LoginResult = require('../model/net/login_result')
const AccountService = require('../services/account_service')
const accountService = new AccountService();
const md5 = require('md5')

router.post('/register', async (ctx, next) => {
    let email = ctx.request.body['email'];
    let passwd = ctx.request.body['passwd'];
    let result = accountService.checkEmailAndPasswd(email, passwd);
    if (!result.isSuccess) {
        ctx.body = JSON.stringify(result);
        return;
    }
    if (accountService.isEmailDuplicate(email)) {
        result.isAccountNotDuplicate = false;
        ctx.body = JSON.stringify(result);
        return;
    }

    ctx.body = JSON.stringify(new Result(true,
        new RegisterResult(true, true, true, true)));
})

router.post('/login', async (ctx, next) => {
    //TODO


    ctx.body = JSON.stringify(new Result(true,
        new LoginResult(true)));
})


module.exports = router
