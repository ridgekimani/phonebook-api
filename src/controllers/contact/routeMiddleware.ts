import { NextFunction, Response, Router } from 'express';
import IRequest from '../../interfaces/request';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

const router: Router = Router();

router.use(async (req: IRequest, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  // Check if there is a token
  if (!token) {
    return res.status(403).json({
      error: 'No token provided.'
    });
  }

  // Verify the token signature
  token = token.split(' ')[1];
  return jwt.verify(token, process.env.SECRET_KEY || '', async function(_err, decoded: any) {
    if (decoded) {
      const user = await User.findOne({ where: { email: decoded.user, userId: decoded.userId } });
      if (!user) {
        return res.status(404).json({
          error: {
            message: 'User does not exist with that token'
          }
        });
      }
      req.userId = user.userId;
      req.user = decoded.user;
      return next();
    }
    return res.status(401).json({
      error: 'The token provided is invalid'
    });
  });
});

export default router;
