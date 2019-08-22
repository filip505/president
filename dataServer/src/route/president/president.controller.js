import { controller, post, get } from '../../helper/controller.decorator'
import { postPresedentRequestDto } from './president.request.dto'
import presedentService from './president.service'

@controller('/president')
class PresedentController {

  @post('')
  async postPresedent(ctx, next) {
    const { error } = postPresedentRequestDto.validate(ctx.request.body);
    if (error) {
      throw error
    }
    ctx.status = 201
    ctx.body = await presedentService.convertData(ctx.request.body)
    next()
  }

  @get('')
  async ping(ctx, next) {
    ctx.body = 'pong'
    next()
  }

}

export default new PresedentController()