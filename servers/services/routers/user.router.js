import express from 'express';
import UserContrl from '../controllers/user.controller';
const UserRouter = express.Router();

UserRouter.post('/user/add/', UserContrl.add);
UserRouter.get('/user/list/', UserContrl.list);
UserRouter.get('/user/one/:id', UserContrl.userOne);
UserRouter.delete('/user/delete/:id', UserContrl.remove);

export default UserRouter;
