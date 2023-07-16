
import { Request, Response, NextFunction } from 'express';
 
export default function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
  console.log(`${request.method} ${request.isAuthenticated?.() ?? "no user session"} ${request.path}`);
  next();
}
 