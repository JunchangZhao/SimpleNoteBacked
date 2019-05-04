const router = require('koa-router')()
const JwtUtils = require('../utils/jwt_utils')
const Result = require('../model/net/restful/result')
const noteService = require("../services/note_service")


router.prefix("/note")

router.all('/socket', function (ctx) {
    let payload = JwtUtils.getJWTPayload(ctx.headers.authorization);
    let user = payload.user;
    ctx.websocket.on('message', async function (message) {
        let requestData = JSON.parse(message);
        if (requestData.type == "upload_note") {
            await noteService.saveNote(user, requestData.data)
        }
    })
    ctx.websocket.send("jack");
})

router.get('/getAllNotesCreateAndModifyInfo', async (ctx, next) => {
    let payload = JwtUtils.getJWTPayload(ctx.headers.authorization);
    let user = payload.user;
    let notes = await noteService.getAllNotesTimeInfoByUserName(user);
    ctx.body = new Result(true, notes, null);
})


module.exports = router