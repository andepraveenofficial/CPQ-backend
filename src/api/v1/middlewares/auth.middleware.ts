import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// authenticateToken Middleware
const authenticateToken = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader: string | undefined = request.headers.authorization;

  let jwtToken;
  if (authHeader !== undefined) {
    const [, jwtTokenPart] = authHeader.split(' ');
    jwtToken = jwtTokenPart;
  }

  try {
    if (jwtToken === undefined) {
      response.status(401).send('Invalid Access Token');
    } else {
      const secretKey: string = process.env.JWT_SECRET_KEY as string; // Ensure SECRET_KEY is defined in your .env file
      await jwt.verify(jwtToken, secretKey);
      next();
    }
  } catch (err) {
    response.status(401).send('Invalid Access Token');
  }
};

export default authenticateToken;
