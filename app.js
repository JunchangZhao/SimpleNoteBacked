const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const Result = require('./model/net/result')
const account = require('./routes/account');
const note = require('./routes/note');

const jwtKoa = require('koa-jwt')
const {secret} = require("./utils/jwt_utils");
// error handler
onerror(app);

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

/* 当token验证异常时候的处理，如token过期、token错误 */
app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = new Result(false, null, "Authentication Error");
        } else {
            throw err;
        }
    });
});

app.use(jwtKoa({secret}).unless({
    path: [/^\/login/, /^\/register/]
}))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// routes
app.use(account.routes(), account.allowedMethods());
app.use(note.routes(), note.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});


module.exports = app;
