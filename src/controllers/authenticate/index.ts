import { Router, Request, Response } from 'express';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import loginSchema from './authenticate.schema';
import User from '../../models/User';

const router: Router = Router();

router.route('/').post(async function(req: Request, res: Response) {
  const validator = Joi.validate(req.body, loginSchema, {
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

  // Check if user exists
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(404).json({ error: 'User does not exist' });

  // Validate password
  const passwordValid = await bcrypt.compare(req.body.password, user.password);
  if (!passwordValid) return res.status(400).json({ error: 'Password is incorrect' });

  // Generate token
  // #TODO: secret key should be an env variable
  const token = jwt.sign({ user: user.email }, 'secretkey');

  return res.status(200).json({
    success: 'User authenticated successfully',
    token
  });
});

export const Authenticate: Router = router;
