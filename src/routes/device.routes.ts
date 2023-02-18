import express from 'express';
import DeviceController from '../controllers/Device_C';
import { verifyJwt } from '../helpers/third-party/authentication';

const router = express.Router();

router
  .route('/:id?')
  .post(verifyJwt, DeviceController.addDevice)
  .get(verifyJwt, DeviceController.listDevice)
  .put(verifyJwt, DeviceController.updateDeviceDetails);

export default router;
