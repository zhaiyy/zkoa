const Emitter = require('events');

const compose = (cxt, middleware) => {
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
module.exports = compose;


