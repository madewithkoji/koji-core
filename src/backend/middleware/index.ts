import { Request, Response, NextFunction } from 'express';

export function middleware(req: Request, res: Response, next: NextFunction) {
  res.locals.KOJI_PROJECT_ID = req.headers['x-trusted-koji-project-id'] || process.env.KOJI_PROJECT_ID;
  res.locals.KOJI_PROJECT_TOKEN = req.headers['x-trusted-koji-project-token'] || process.env.KOJI_PROJECT_TOKEN;
  next();
}
