import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse, isAxiosError } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class SignIn {
  public async read(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await authService.signIn(req.body);
      console.log('response ---> ', response.data);

      req.session = { jwt: response.data.token };
      res.status(StatusCodes.CREATED).json({ message: response.data.message, user: response.data.user });
    } catch (error) {
      if (isAxiosError(error)) {
        // ตรวจสอบว่า error เป็น AxiosError
        if (error.response) {
          console.log('error response data ---> ', error.response.data);
          res.status(error.response.status).json(error.response.data);
        } else {
          console.log('error without response ---> ', error.message);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
      } else {
        console.log('unexpected error ---> ', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An unexpected error occurred.' });
      }
    }
  }
}
