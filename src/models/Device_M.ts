import Device from '../schema/Devices';

export default class DeviceModel {
  static async addDevice(getData: any) {
    let response;
    try {
      const findDevices = await Device.findAll({
        where: { user_id: getData.authData.id },
        raw: true,
      });

      response = {
        code: 200,
        status: true,
        info: 'OK',
        message: 'Device listed successfully.',
        data: findDevices,
      };
    } catch (error) {
      response = { code: 500, status: false, info: 'Internal Server Error' };
    }
    return response;
  }

  static async listDevice(getData: any) {
    let response;
    try {
      const findDevices = await Device.findAll({
        where: { user_id: getData.authData.id },
        raw: true,
      });

      response = {
        code: 200,
        status: true,
        info: 'OK',
        message: 'Device listed successfully.',
        data: findDevices,
      };
    } catch (error) {
      response = { code: 500, status: false, info: 'Internal Server Error' };
    }
    return response;
  }

  static async updateDeviceDetails(postData: any) {
    let response;
    try {
      await Device.update({ ...postData }, { where: { id: postData.id } });

      response = {
        code: 200,
        status: true,
        info: 'OK',
        message: 'Device name updated successfully.',
      };
    } catch (error) {
      response = { code: 500, status: false, info: 'Internal Server Error' };
    }
    return response;
  }
}
