import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class CurrentUser {
  public async read(_req: Request, res: Response, next: NextFunction) {
    try {
      const response: AxiosResponse = await authService.getCurrentUser();
      res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    } catch (error) {
      next(error);
    }
  }

  public async resendEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const response: AxiosResponse = await authService.resendEmail(req.body);
      res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    } catch (error) {
      next(error);
    }
  }
}
