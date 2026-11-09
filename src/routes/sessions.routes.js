import { Router } from "express"
import { register, login, logout } from "../controllers/user.controller.js"
import { passportCallback } from "../middlewares/callbacks.middleware.js";
import passport from 'passport';
import { loginResponse, registerResponse, getCurrentUser, getAllUsers } from "../controllers/session.controller.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";

const routerSessions = Router()

routerSessions.get('/',authorizeRoles('admin'), getAllUsers)
routerSessions.post('/register',passportCallback('register', {
    session: false
},), registerResponse);
routerSessions.post('/login',passportCallback('login'),loginResponse);
routerSessions.get('/current',passportCallback('current'), getCurrentUser);
routerSessions.post('/logout',logout);

export default routerSessions;