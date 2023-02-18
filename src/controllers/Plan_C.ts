import { Request, Response } from 'express';

import PlanModel from '../models/Plan_M';

export default class PlanController {
  static async addPlan(req: Request, res: Response) {
    const { body } = req;

    const postData = { ...body };

    const response = await PlanModel.addPlan(postData);
    res.status(response.code).json(response);
  }
}
