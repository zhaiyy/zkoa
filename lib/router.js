const Koa = require('./zkoa.js')
const app = new Koa()
const Emitter = require('events');
const url = require('url');
const compose = require('./compose');


module.exports = class Router extends Emitter{
    constructor() {
        super();
        this.router = '';
        this.path ='';
        console.log(url.pathname)

    };
    routes() {
        var dispatch = (ctx,next)=>{
            //console.log(ctx)
            console.log(ctx.url)
            ctx.url = this.path;
           // console.log(url.pathname)
            return this.router;
        }
        return dispatch

    };

    get(path,fn){
        //this.router.push({path:path,fn:fn,method:'get'})
        this.path = path;
        this.router = fn;
       // app.use(fn);
        //app.listen(3001);

    }

}
