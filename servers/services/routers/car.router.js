import express from 'express';
import CarContrl from '../controllers/car.controller';
const CarRouter = express.Router();

CarRouter.post('/car/add/', CarContrl.addCar);
CarRouter.get('/car/list/', CarContrl.list);
CarRouter.put('/car/comment/:id', CarContrl.addComment);
CarRouter.get('/car/one/:id', CarContrl.carOne);

export default CarRouter;
