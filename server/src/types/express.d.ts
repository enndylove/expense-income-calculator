import { User } from 'src/shared/entities/user';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
