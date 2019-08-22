import Joi from 'joi'

const postPresedentRequestDto = Joi.array().items(Joi.object({
  id: Joi.number().required(),
  president: Joi.number().required(),
  nm: Joi.string().min(5).required(),
  pp: Joi.string().min(2).required(),
  tm: Joi.string().min(4).max(9).required()
}));

export { 
  postPresedentRequestDto
}