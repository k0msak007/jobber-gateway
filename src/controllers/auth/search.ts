import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse, isAxiosError } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Search {
  public async gigById(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await authService.getGig(req.params.gigId);
      res.status(StatusCodes.OK).json({ message: response.data.message, gig: response.data.gig });
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

  public async gigs(req: Request, res: Response): Promise<void> {
    try {
      const { from, size, type } = req.params;
      let query = '';
      const objList = Object.entries(req.query);
      const lastItemIndex = objList.length - 1;
      objList.forEach(([key, value], index) => {
        query += `${key}=${value}${index !== lastItemIndex ? '&' : ''}`;
      });
      const response: AxiosResponse = await authService.getGigs(`${query}`, from, size, type);
      res.status(StatusCodes.OK).json({ message: response.data.message, total: response.data.total, gigs: response.data.gigs });
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
