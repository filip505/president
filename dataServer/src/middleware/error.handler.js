const errorHandler = () => async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if(error.name === 'ValidationError'){
      ctx.status = 404
      ctx.body = error.message
    } else if(error.name === 'SyntaxError'){
      ctx.status = 404
      ctx.body = error.message
    }
    else {
      console.log(error)
      ctx.status = 500
    }
  }
}

export default errorHandler;