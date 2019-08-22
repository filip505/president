import { controller, post, get } from '../../helper/controller.decorator'
import { postPresedentRequestDto } from './president.request.dto'
import presidentService from './president.service'

@controller('/president')
class PresedentController {

  @post('')
  async postPresedent(ctx, next) {
    const { error } = postPresedentRequestDto.validate(ctx.request.body);
    if (error) {
      throw error
    }
    ctx.status = 201
    ctx.body = await presidentService.convertData(ctx.request.body)
    next()
  }

  @get('/:filename')
  async getPresedent(ctx, next) {
    const filename = ctx.params.filename
    ctx.body = await presidentService.getData(filename)
    ctx.set('Content-disposition', `attachment; filename=${filename}.csv`);
    next()
  }

}

export default new PresedentController()