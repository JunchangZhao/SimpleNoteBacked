const router = require('koa-router')()
const Result = require('../model/net/result')
const JwtUtils = require('../utils/jwt_utils')

router.prefix('/note')

router.get('/getAllNotes', function (ctx, next) {
    let payload = JwtUtils.getJWTPayload(ctx.headers.authorization);
    ctx.body = new Result(true, [payload.user], null);
})


module.exports = router
