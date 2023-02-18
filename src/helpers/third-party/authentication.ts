import JWT from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import User from '../../schema/User';
import Environment from '../../interface/Environment';

const environmentVar: Environment = {
  ACCESS_TOKEN_SECRET: String(process.env.ACCESS_TOKEN_SECRET),
  ACCESS_TOKEN_TIMEOUT_DURATION: String(
    process.env.ACCESS_TOKEN_TIMEOUT_DURATION,
  ),
  REFRESH_TOKEN_SECRET: String(process.env.REFRESH_TOKEN_SECRET),
  REFRESH_TOKEN_TIMEOUT_DURATION: String(
    process.env.REFRESH_TOKEN_TIMEOUT_DURATION,
  ),
};
/* -------------------------------------------------------------------------- */
/*                               JWT Validation                               */
/* -------------------------------------------------------------------------- */

async function signJwt(payloadData: any) {
  const jwtPayload = payloadData;

  const addToken = { ...payloadData };

  // JWT token with Payload and secret.
  addToken.token = JWT.sign(jwtPayload, environmentVar.ACCESS_TOKEN_SECRET, {
    expiresIn: environmentVar.ACCESS_TOKEN_TIMEOUT_DURATION,
  });

  addToken.refresh_token = JWT.sign(
    jwtPayload,
    environmentVar.REFRESH_TOKEN_SECRET,
    {
      expiresIn: environmentVar.REFRESH_TOKEN_TIMEOUT_DURATION,
    },
  );

  return addToken;
}

async function verifyJwt(req: any, res: Response, next: NextFunction) {
  // get token from headers
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      // no authorization
      res
        .status(401)
        .json({ message: 'Access denied Authorization in header needed.' });
    } else if (authorization) {
      const verifyValidToken = JWT.decode(authorization);

      if (!verifyValidToken) {
        res.status(401).json({ message: 'Invalid token in headers provided.' });
      } else {
        const decoded: any = await JWT.verify(
          authorization,
          environmentVar.ACCESS_TOKEN_SECRET,
          {
            ignoreExpiration: true,
          },
        );

        const findUserWithAuth = await User.findOne({
          where: {
            email: decoded.email,
          },
        });

        const todayDate = new Date().getTime();

        if (decoded.exp < todayDate / 1000) {
          res.status(401).json({ message: 'JWT Token Expired' });
        } else if (findUserWithAuth) {
          req.authData = decoded;
          next();
        } else {
          res
            .status(401)
            .json({ message: 'Invalid Authorization in headers.' });
        }
      }
    }
  } catch (error: any) {
    if (error.message === 'invalid signature') {
      res.status(401).json({ message: 'Login Again (Invalid JWT Signature).' });
    } else {
      res.status(500).json(error.message);
    }
  }
}

export { signJwt, verifyJwt };
