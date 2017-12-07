const http = require('http')
const Emitter = require('events');
const context = require('./context');

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
           const fn = this.compose(ctx, this.middleware);
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

    compose(cxt, middleware) {
        // if(typeof middleware !='Array') return Promise.reject(new Error('middleware must be array'));
        return function (cxt, next) {
            return dispatch(0);

            function dispatch(n) {
                let fn = middleware[n];
                if (typeof fn !== 'function') return Promise.reject(new Error('middleware must be a function!'));

                if (n == middleware.length) {
                    fn = next;
                }
                try{
                    return Promise.resolve(fn(cxt, function next() {
                        return dispatch(n + 1)
                    }))
                }catch (err){
                    return Promise.reject(err);
                }

            }
        }
    };
    respond(cxt){
        cxt.response.end(cxt.body)
    }


}
