import Router from 'koa-router'

function getValues(method, sufix, descriptor, middleware) {
    descriptor.value = {
        method,
        sufix: sufix ? sufix : '/',
        value: descriptor.value,
        middlewares: middleware ? descriptor.value.middlewares ? [...descriptor.value.middlewares, middleware] : [middleware] : null
    }
    return descriptor
}

const get = (sufix) => (target, property, descriptor) => getValues('get', sufix, descriptor)
const post = (sufix) => (target, property, descriptor) => getValues('post', sufix, descriptor)
const put = (sufix) => (target, property, descriptor) => getValues('put', sufix, descriptor)
const update = (sufix) => (target, property, descriptor) => getValues('update', sufix, descriptor)
const dele = (sufix) => (target, property, descriptor) => getValues('delete', sufix, descriptor)
const patch = (sufix) => (target, property, descriptor) => getValues('patch', sufix, descriptor)

const createMiddleware = (middleware) => (target, property, descriptor) => {
    descriptor.value.middlewares = descriptor.value.middlewares ?
        [...descriptor.value.middlewares, middleware] : [middleware]
    return descriptor
}

function controller(prefix) {
    return function (MyClass) {
        return function () {
            const router = new Router(prefix)
            const elements = Object.values(Object.getOwnPropertyDescriptors(MyClass.prototype))
            for (let element of elements) {
                const { method, sufix, value } = element.value
                let m = value


                if (method) {
                    if (element.value.middlewares) {
                        m = element.value.middlewares.reduce((prev, curr) => {
                            return curr.bind(null, prev)();
                        }, value)
                    }
                    router[method](prefix + sufix, m)
                }
            }
            return router
        }
    }
}

export { get, post, controller, put, update, dele, patch }