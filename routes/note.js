const router = require('koa-router')()
const JwtUtils = require('../utils/jwt_utils')

router.prefix("note")

router.all('/socket', function (ctx) {
    let payload = JwtUtils.getJWTPayload(ctx.headers.authorization);
    let user = payload.user;
    ctx.websocket.on('message', function (message) {
        console.log(message)
        let requestData = JSON.parse(message);
        ctx.websocket.send(`${requestData.method}`)
    })
})

router.post('/getAllNotesCreateAndModifyInfo', async (ctx, next) => {
    let payload = JwtUtils.getJWTPayload(ctx.headers.authorization);
    let user = payload.user;

})


module.exports = router