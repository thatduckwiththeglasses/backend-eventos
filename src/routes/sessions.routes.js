import { Router } from "express"
import { register, login, logout } from "../controllers/user.controller.js"
import { passportCallback } from "../middlewares/callbacks.middleware.js";
import passport from 'passport';
import { loginResponse, registerResponse, getCurrentUser } from "../controllers/session.controller.js";

const routerSessions = Router()

routerSessions.post('/register',passport.authenticate('register', {
    session: false
},), registerResponse);
routerSessions.post('/login',passportCallback('login'),loginResponse);
routerSessions.get('/current',passportCallback('current'), getCurrentUser);
routerSessions.post('/logout',logout);

export default routerSessions;