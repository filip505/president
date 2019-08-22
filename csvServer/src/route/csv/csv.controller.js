import { controller, post, get } from '../../helper/controller.decorator'
import csvService from './csv.service'

@controller('/csv')
class CsvController {

  @post('')
  async postCsv(ctx, next) {
    ctx.body = await csvService.generateCsv(ctx.request.body)
    ctx.status = 201
    next()
  }

  @get('/:filename')
  async getCsv(ctx, next) {
    const filename = ctx.params.filename
    ctx.body = await csvService.getCsv(filename)
    ctx.set('Content-disposition', `attachment; filename=${filename}.csv`);
    next()
  }

}

export default new CsvController()