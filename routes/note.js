const router = require('koa-router')()
const JwtUtils = require('../utils/jwt_utils')
const noteService = require("../services/note_service")
router.prefix("/note")
const Result = require('../model/net/restful/result')

router.all('/socket', function (ctx) {
    let payload = JwtUtils.getJWTPayload(ctx.headers.authorization);
    let user = payload.user;
    ctx.websocket.on('message', function (message) {
        console.log(message)
        let requestData = JSON.parse(message);
        ctx.websocket.send(`${requestData.method}`)
    })
})

router.get('/getAllNotesCreateAndModifyInfo', async (ctx, next) => {
    let payload = JwtUtils.getJWTPayload(ctx.headers.authorization);
    let user = payload.user;
    let notes = await noteService.getAllNotesTimeInfoByUserName(user);
    ctx.body = new Result(true, notes, null);
})


module.exports = router