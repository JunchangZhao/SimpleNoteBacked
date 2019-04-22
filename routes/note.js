const router = require('koa-router')()
const JwtUtils = require('../utils/jwt_utils')

router.all('/note', function (ctx) {
    ctx.websocket.on('message', function (message) {
        ctx.websocket.send("jack")
    })
})

module.exports = router