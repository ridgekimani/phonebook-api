import { Router, Response } from 'express';
import IRequest from '../../../interfaces/request';
import Joi from 'joi';
import createSchema from './create.schema';
import router from '../routeMiddleware';
import Contact from '../../../models/Contact';
import User from '../../../models/User';

router.route('/').post(async (req: IRequest, res: Response) => {
  const validator = Joi.validate(req.body, createSchema, {
    allowUnknown: false,
    abortEarly: false
  });

  // Validate the json schema
  if (validator.error) {
    return res.status(400).json({
      error: validator.error.details.reduce((acc: any = [], value) => {
        acc.push({ message: value.message });
        return acc;
      }, [])
    });
  }

  // Create contact
  const user = await User.findOne({ where: { email: req.user } });
  if (user) {
    await Contact.findOrCreate({ where: { ...req.body, userId: user.userId } }).spread((contact, created) => {
      if (created) {
        return res.status(201).json({
          success: {
            message: 'Contact created successfully',
            contact
          }
        });
      }
      return res.status(409).json({
        error: 'Contact already exists'
      });
    });
  }

  return res.status(404).json({
    error: {
      message: 'User does not exist'
    }
  });
});

export const CreateContact: Router = router;
