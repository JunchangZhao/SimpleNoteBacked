const router = require('koa-router')()
const JwtUtils = require('../utils/jwt_utils')
const noteService = require("../services/note_service")
const WSResult = require("../model/net/ws/ws_result")

router.prefix("/note")

router.all('/socket', async function (ctx) {
    let payload = JwtUtils.getJWTPayload(ctx.headers.authorization);
    let user = payload.user;
    let notes = await noteService.getAllNotesTimeInfoByUserName(user);
    ctx.websocket.send(JSON.stringify(new WSResult("create_modify_time", notes)));
    ctx.websocket.on('message', async function (message) {
        console.log(message);
        let requestData = JSON.parse(message);
        if (requestData.type == "upload_note") {
            await noteService.saveNote(user, requestData.data)
        }
    })
})


module.exports = router