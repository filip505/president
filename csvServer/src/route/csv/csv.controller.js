import { controller, post, get } from '../../helper/controller.decorator'
// import { postPresedentRequestDto } from './presedent.request.dto'
import csvService from './csv.service'
import presedentService from './csv.service'
@controller('/csv')
class CsvController {

  @post('')
  async postCsv(ctx, next) {
    ctx.set('Content-disposition', `attachment; filename=dsds.csv`);
    ctx.body = await presedentService.generateCsv(ctx.request.body)
    ctx.status = 201
    next()
  }

}

export default new CsvController()