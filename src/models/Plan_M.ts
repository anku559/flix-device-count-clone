import Plan from '../schema/Plan';

import { PlanData } from '../interface/Plan';
import { ResponseObject } from '../interface/ResponseObject';

export default class PlanModel {
  static async addPlan(postData: PlanData) {
    let response: ResponseObject;

    try {
      const trimPlanName = postData.plan_name.trim();

      const findPlan = await Plan.findOne({
        where: { plan_name: trimPlanName },
      });

      if (findPlan) {
        response = {
          code: 409,
          status: true,
          info: 'Conflict',
          message: 'Duplicate plan found.',
        };
      } else {
        const newPlanData = await Plan.create({ ...postData });

        response = {
          code: 201,
          status: true,
          info: 'Created',
          message: 'Plan created successfully.',
          data: newPlanData,
        };
      }
    } catch (error) {
      response = {
        code: 500,
        status: false,
        info: 'Internal Server Error',
      };
    }
    return response;
  }
}
