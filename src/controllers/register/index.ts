import { Router, Request, Response } from 'express';
import Joi from 'joi';
import bcyrpt from 'bcrypt';
import User from '../../models/User';
import registerSchema from './register.schema';

const router: Router = Router();

router.route('/').post(async function(req: Request, res: Response) {
  const validator = Joi.validate(req.body, registerSchema, {
    allowUnknown: false,
    abortEarly: false
  });

  // Validate the json schema
  if (validator.error) {
    return res.status(400).json({
      error: validator.error.details.reduce((acc: any = [], value) => {
        acc.push({ message: value.message });
        return acc;
      }, []),
      validation: true
    });
  }

  // Check if user exists with the same email
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) return res.status(409).json({ error: 'User exists with that email' });

  // Save user
  try {
    const password = await bcyrpt.hash(req.body.password, 10);

    const newUser = new User({ ...req.body, password });
    newUser.save();

    return res.status(201).json({
      success: 'User created successfully'
    });
  } catch (e) {
    return res.status(500).json({ error: 'Error occurred' });
  }
});

export const Register: Router = router;
