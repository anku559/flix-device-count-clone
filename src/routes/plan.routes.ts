import express from 'express';
import PlanController from '../controllers/Plan_C';

const router = express.Router();

router.route('/:id?').post(PlanController.addPlan);

export default router;
