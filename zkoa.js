const http = require('http')
module.exports = class Application {
    constructor() {
        this.middleware = [];

    };

    listen(port) {
        console.log(`Server running on port ${port}.`);
        return http.createServer(this.callback()).listen(port)

    };

    use(fn) {
        if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
        this.middleware.push(fn)
    };

    callback() {
        const onRequest = (request, response) => {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write ('hello');
            /*this.middleware.forEach((fn)=>{
                fn();
            })*/
            response.end();
        }
        return onRequest;

    }
}
