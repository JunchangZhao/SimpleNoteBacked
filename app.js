const Koa = require('koa');
const koa = new Koa();
const WeoSocket = require('koa-websocket')
const app = WeoSocket(koa)
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const Result = require('./model/net/restful/result')
const account = require('./routes/account');
const note = require('./routes/note');

const jwtKoa = require('koa-jwt')
const {secret} = require("./utils/jwt_utils");
// error handler
onerror(koa);

// middlewares
koa.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
koa.use(json());
koa.use(logger());
koa.use(require('koa-static')(__dirname + '/public'));

/* 当token验证异常时候的处理，如token过期、token错误 */
koa.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = new Result(false, null, "Authentication Error");
        } else {
            throw err;
        }
    });
});

koa.use(jwtKoa({secret}).unless({
    path: [/^\/login/, /^\/register/]
}))

app.ws.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
        } else {
            throw err;
        }
    });
});

app.ws.use(jwtKoa({secret}));

koa.use(views(__dirname + '/views', {
    extension: 'ejs'
}));

// logger
koa.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// routes
koa.use(account.routes());

// error-handling
koa.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

// websocket
app.ws.use(note.routes())


module.exports = app;
