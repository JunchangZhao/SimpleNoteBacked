const router = require('koa-router')()
const Result = require('../model/net/result')
const RegisterResult = require('../model/net/register_result')
const LoginResult = require('../model/net/login_result')
const AccountService = require('../services/account_service')
const JwtUtils = require('../utils/jwt_utils')
const accountService = new AccountService();

router.post('/register', async (ctx, next) => {
    let email = ctx.request.body['email'];
    let passwd = ctx.request.body['passwd'];
    if (email == null || passwd == null) {
        ctx.body = new Result(false, null, "input is null!");
        return;
    }
    let result = accountService.checkEmailAndPasswd(email, passwd);
    if (!result.isSuccess) {
        ctx.body = new Result(true, result, null);
        return;
    }
    if (await accountService.isEmailDuplicate(email)) {
        result.isAccountNotDuplicate = false;
        result.isSuccess = false;
        ctx.body = new Result(true, result, null);
        return;
    }
    let isSuccess = await accountService.registerAccount(email, passwd);
    ctx.body = new Result(true, new RegisterResult(isSuccess, true, true, true), null);

})

router.post('/login', async (ctx, next) => {
    let email = ctx.request.body['email'];
    let passwd = ctx.request.body['passwd'];
    if (email == null || passwd == null) {
        ctx.body = new Result(false, null, "input is null!");
        return;
    }
    let isSuccess = await accountService.login(email, passwd);
    ctx.body = new Result(true, new LoginResult(isSuccess, isSuccess ? JwtUtils.getToken({user: email}) : null), null);
})


module.exports = router
