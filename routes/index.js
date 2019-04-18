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
        ctx.body = JSON.stringify(new Result(true, result));
        return;
    }
    if (await accountService.isEmailDuplicate(email)) {
        result.isAccountNotDuplicate = false;
        result.isSuccess = false;
        ctx.body = JSON.stringify(new Result(true, result));
        return;
    }
    let isSuccess = await accountService.registerAccount(email, passwd);
    ctx.body = JSON.stringify(new Result(true,
        new RegisterResult(isSuccess, true, true, true)));

})

router.post('/login', async (ctx, next) => {
    let isSuccess = await accountService.login(email, passwd);
    ctx.body = JSON.stringify(new Result(true,
        new LoginResult(isSuccess)));
})


module.exports = router
