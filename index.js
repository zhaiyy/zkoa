const Koa = require('./zkoa.js')
const app = new Koa()

app.use(ctx => {
    ctx.body = 'hello koa2'
})

console.log(app)
app.listen(3000)
