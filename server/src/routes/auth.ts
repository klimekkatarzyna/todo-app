import express from 'express';
import { authorization } from '../utils/auth';
import { registerValidationSchema, RegisterValidationType, loginValidationSchema, LoginValidationType } from '@kkrawczyk/todo-common';
import { validateBody } from '../utils/validation';
import { checkSession, login, logout, register } from '../controllers/auth';

const auth = express.Router();

// MVC pattern
// model => RegisterValidationType
// view => this file
// controller => register

auth.post('/register', validateBody<RegisterValidationType>(registerValidationSchema), register);

auth.post('/login', validateBody<LoginValidationType>(loginValidationSchema), login);

auth.get('/me', authorization, checkSession);

auth.post('/logout', logout);

export default auth;
