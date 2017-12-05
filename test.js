const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
    ctx.body = 'hello koa2'
})
app.use(ctx => {
    ctx.body = 'hello koa11112'
})
app.listen(3100)
console.log('[demo] start-quick is starting at port 3000')