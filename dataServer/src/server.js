import Koa from 'koa'
import errorHandler from './middleware/error.handler'
import presedentsController from './route/president/president.controller'
import bodyParser from 'koa-bodyparser'
import { PORT } from './env'
import Router from 'koa-router'

const server = () => new Promise((resolve, reject) => {
  const app = new Koa()
  var pingRouter = new Router();
  pingRouter.get('/ping', (ctx, next) => {
    ctx.body = 'pong'
    next();
  });
  app.use(errorHandler())
  app.use(bodyParser())
  app.use(presedentsController.routes())
  app.use(pingRouter.routes())
  const server = app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
    resolve(server)
  })
 
})

export default server
