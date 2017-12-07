const Koa = require('koa')
const app = new Koa()
app.use(async function (ctx, next) {
    console.log('hahahahha')
    await next();
   console.log('lalalalal')

});
app.use(ctx => {
    ctx.body = 'hello koa2'
    console.log('hello koa2l')

})

app.listen(3100)
console.log('[demo] start-quick is starting at port 3000')