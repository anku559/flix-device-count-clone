import { Request, Response } from 'express';
import UserModel from '../models/User_M';

export default class UserController {
  static async registerUser(req: Request, res: Response) {
    const { body } = req;
    const postData = { ...body };
    const response = await UserModel.registerUser(postData);
    res.status(response.code).json(response);
  }

  static async loginUser(req: Request, res: Response) {
    const { body } = req;
    const postData = { ...body };
    const response = await UserModel.loginUser(postData);
    res.status(response.code).json(response);
  }

  static async updateUser(req: any, res: Response) {
    const { body, params, authData } = req;
    const postData = { ...body, id: params.id, authData };
    const response = await UserModel.updateUser(postData);
    res.status(response.code).json(response);
  }
}
