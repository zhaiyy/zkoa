const Koa = require('./lib/zkoa.js')
const Router = require('./lib/router.js')
const app = new Koa()
const router = new Router()
router.get('/home',ctx => {
        ctx.body = 'hello home';
        console.log('hello home')
    }
)
/*
router.get('/index',ctx => {
        ctx.body = 'hello index';
        console.log('hello home')
    }
)
*/


/*app.use(async function (ctx, next) {
    console.log('hahahahha')
    await next();
    console.log('lalalalal')

});*/
/*app.use(ctx => {
    ctx.body = 'hello index';
    console.log('hello koa2l')

})*/
console.log(    `JSON.stringify(router.routes())`)
console.log(JSON.stringify(router.routes()))
app.use(router.routes())

app.listen(3000);
console.log(`Server running on port 3000.`);

