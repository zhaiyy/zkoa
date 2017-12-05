const Koa = require('./zkoa.js')
const app = new Koa()

app.use(ctx => {
    ctx.body = 'hello koa211';
})
app.listen(3000);
console.log(`Server running on port 3000.`);

