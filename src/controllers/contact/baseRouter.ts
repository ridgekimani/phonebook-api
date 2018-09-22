import { NextFunction, Response, Router } from 'express';
import IRequest from '../../interfaces/request';
import jwt from 'jsonwebtoken';

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
  // #TODO: secret key should be an env variable
  return jwt.verify(token, 'secretkey', function(_err, decoded: any) {
    if (decoded) {
      req.user = decoded.user;
      return next();
    }
    return res.status(401).json({
      error: 'The token provided is invalid'
    });
  });
});

export default router;
