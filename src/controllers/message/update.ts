import { AxiosResponse, isAxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { messageService } from '@gateway/services/api/message.service';

export class Update {
  public async offer(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await messageService.updateOffer(req.body.messageId, req.body.type);
      res.status(StatusCodes.OK).json({ message: response.data.message, singleMessage: response.data.singleMessage });
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

  public async markMultipleMessages(req: Request, res: Response): Promise<void> {
    try {
      const { messageId, senderUsername, receiverUsername } = req.body;
      const response: AxiosResponse = await messageService.markMultipleMessagesAsRead(receiverUsername, senderUsername, messageId);
      res.status(StatusCodes.OK).json({ message: response.data.message });
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

  public async markSingleMessage(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await messageService.markMessageAsRead(req.body.messageId);
      res.status(StatusCodes.OK).json({ message: response.data.message, singleMessage: response.data.singleMessage });
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
