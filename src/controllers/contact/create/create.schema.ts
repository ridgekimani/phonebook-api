import Joi from 'joi';

const commonValidator = Joi.string()
  .alphanum()
  .min(3)
  .max(30);

export default Joi.object({
  firstName: commonValidator.required(),
  lastName: commonValidator,
  company: commonValidator,
  phone: Joi.string()
    .min(10)
    .max(13)
    .required(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
  country: Joi.string()
    .max(30)
    .min(3)
});
