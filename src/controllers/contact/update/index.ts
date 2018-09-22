import { Router, Response } from 'express';
import Joi from 'joi';
import router from '../routeMiddleware';
import Contact from '../../../models/Contact';
import IRequest from '../../../interfaces/request';
import contactSchema from './update.schema';

router.route('/:contact').patch(async (req: IRequest, res: Response) => {
  const contactID = req.params.contact;

  if (!contactID) {
    return res.status(400).json({
      error: {
        message: 'Contact id is required'
      }
    });
  }

  if (!Object.values(req.body).length)
    return res.status(400).json({ error: { message: 'Update values cannot be empty' } });

  // Validate the json schema
  const validator = Joi.validate(req.body, contactSchema, {
    allowUnknown: false,
    abortEarly: false
  });
  if (validator.error) {
    return res.status(400).json({
      error: validator.error.details.reduce((acc: any = [], value) => {
        acc.push({ message: value.message });
        return acc;
      }, [])
    });
  }

  const contact = await Contact.findOne({ where: { contactID, userId: req.userId } });
  if (!contact) {
    return res.status(404).json({
      error: {
        message: 'Contact does not exist'
      }
    });
  }
  try {
    await Contact.update({ ...req.body }, { where: { userId: req.userId, contactID } });
    return res.status(200).json({
      success: {
        contact: await Contact.findOne({ where: { contactID, userId: req.userId } })
      }
    });
  } catch (e) {
    return res.status(e.status);
  }
});

export const UpdateContact: Router = router;
