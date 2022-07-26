import express from 'express';
import { authorization } from '../utils/auth';
import { registerValidationSchema, RegisterValidationType, loginValidationSchema, LoginValidationType } from '@kkrawczyk/todo-common';
import { validateBody } from '../utils/validation';
import { checkSession, getUser, login, logout, register } from '../controllers/auth';

const auth = express.Router();

// MVC pattern
// model => RegisterValidationType
// view => this file
// controller => register

// REDT API principle

auth.post('/register', validateBody<RegisterValidationType>(registerValidationSchema), register);

auth.post('/login', validateBody<LoginValidationType>(loginValidationSchema), login);

auth.get('/me', authorization, checkSession);

auth.post('/logout', logout);

auth.get('/user/:_id', authorization, getUser);

export default auth;
