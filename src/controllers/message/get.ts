import { AxiosResponse, isAxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { messageService } from '@gateway/services/api/message.service';

export class Get {
  public async conversation(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await messageService.getConversation(req.params.senderUsername, req.params.receiverUsername);
      res.status(StatusCodes.OK).json({ message: response.data.message, conversations: response.data.conversations });
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

  public async messages(req: Request, res: Response): Promise<void> {
    try {
      const response: AxiosResponse = await messageService.getMessages(req.params.senderUsername, req.params.receiverUsername);
      res.status(StatusCodes.OK).json({ message: response.data.message, messages: response.data.messages });
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

  public async conversationList(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.params;
      const response: AxiosResponse = await messageService.getConversationList(username);
      res.status(StatusCodes.OK).json({ message: response.data.message, conversations: response.data.conversations });
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

  public async userMessages(req: Request, res: Response): Promise<void> {
    try {
      const { conversationId } = req.params;
      const response: AxiosResponse = await messageService.getUserMessages(conversationId);
      res.status(StatusCodes.OK).json({ message: response.data.message, messages: response.data.messages });
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
