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
           let cxt = this.createContext(request, response);
            this.middleware.forEach((fn)=>{
                fn(cxt).then(this.respond(cxt));
            })

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
    compose(cxt,middleware){
        dispatch(0);
        if(typeof middleware !='Array') return Promise.reject(new Error('middleware must be array'));

        if(middleware.length <=0) return;
        function dispatch(n){
            const fn = middleware[n];
            if (typeof fn !== 'function') return Promise.reject(new Error('middleware must be a function!'));

            return Promise.resolve(fn(cxt, function next () {
                return dispatch(n + 1)
            }))
        }
    };
    respond(cxt){
        cxt.response.end(cxt.body)
    }


}
