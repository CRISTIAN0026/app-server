import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authMiddleware = (req, _, next) => {
  const token = req.headers.authorization || '';
  const key = process.env.SECRET_KEY || "UNSAFE_STRING"
  try {
    if (!token) {
      req.user = null;
      next();
    } else {
      const decodedUser = jwt.verify(token, key);
      req.user = decodedUser;
      next();
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    req.user = null;
    next();
  }
};

export default authMiddleware;