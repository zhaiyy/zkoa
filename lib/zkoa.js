const http = require('http')
const Emitter = require('events');
const context = require('./context');
const compose = require('./compose');

module.exports = class Application extends Emitter{
    constructor() {
        super();
        this.middleware = [];
        this.context = context;

    };

    listen(port) {
        return http.createServer(this.callback()).listen(port)

    };

    use(fn) {
        if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
        this.middleware.push(fn);
        return this;
    };
    callback() {
        const onRequest = (request, response) => {
           let ctx = this.createContext(request, response);
           const fn = compose(ctx, this.middleware);
            fn(ctx).then( this.respond(ctx))
        }
        return onRequest;
    };
    createContext(request, response){
        let cxt = Object.create(this.context);
        cxt.request = request;
        cxt.response = response;
        return cxt;
        //console.log(cxt)

    };

    respond(cxt){
        cxt.response.end(cxt.body)
    }


}
