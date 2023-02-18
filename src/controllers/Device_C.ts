import { Response } from 'express';
import DeviceModel from '../models/Device_M';

export default class DeviceController {
  static async addDevice(req: any, res: Response) {
    const { authData, body, params } = req;

    const postData = {
      authData,
      id: params.id,
      ...body,
    };

    const response = await DeviceModel.addDevice(postData);
    res.status(response.code).json(response);
  }

  static async listDevice(req: any, res: Response) {
    const { authData } = req;

    const getData = {
      authData,
    };

    const response = await DeviceModel.listDevice(getData);
    res.status(response.code).json(response);
  }

  static async updateDeviceDetails(req: any, res: Response) {
    const { authData, body, params } = req;

    const postData = {
      authData,
      id: params.id,
      ...body,
    };

    const response = await DeviceModel.updateDeviceDetails(postData);
    res.status(response.code).json(response);
  }
}
