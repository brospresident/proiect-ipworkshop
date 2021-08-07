import { Router } from 'express';
import { httpRegisterUser, httpLoginUser, httpSaveUser } from './users.controller';

const usersRouter: Router = Router();

usersRouter.post('/register', httpRegisterUser);
usersRouter.post('/login', httpLoginUser);
usersRouter.post('/save', httpSaveUser)

export default usersRouter;