const router = require('koa-router')()
const JwtUtils = require('../utils/jwt_utils')

router.all('/note', function (ctx) {
    ctx.websocket.on('message', function (message) {
        let payload = JwtUtils.getJWTPayload(ctx.headers.authorization);
        let user = payload.user;
        console.log(message)
        let requestData = JSON.parse(message);
        ctx.websocket.send(`${requestData.method}`)
    })
})

module.exports = router