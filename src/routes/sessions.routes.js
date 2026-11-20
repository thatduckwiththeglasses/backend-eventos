import { Router } from "express";
import { passportCallback } from "../middlewares/callbacks.middleware.js";
import passport from 'passport';
import { loginResponse, registerResponse, getCurrentUser, getAllUsers, logout} from "../controllers/session.controller.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";

const routerSessions = Router()

routerSessions.get('/',authorizeRoles('admin'), getAllUsers)
routerSessions.post('/register',passportCallback('register'), registerResponse);
routerSessions.post('/login',passportCallback('login'),loginResponse);
routerSessions.get('/current',passportCallback('current'), getCurrentUser);
routerSessions.post('/logout',logout);

export default routerSessions;