import { Project, Token, User } from '@prisma/client';

declare global {
  namespace Express {
    export interface Request {
      user: User;
      project: Project;
      token: Token;
      rights: string[];
    }
  }
}
