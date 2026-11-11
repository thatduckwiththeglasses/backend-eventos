import { Router } from "express";
import { passportCallback } from "../middlewares/callbacks.middleware.js";
import passport from 'passport';
import { loginResponse, registerResponse, getCurrentUser, logout } from "../controllers/session.controller.js";

const routerSessions = Router()

routerSessions.post('/register',passportCallback('register', {
    session: false
},), registerResponse);
routerSessions.post('/login',passportCallback('login'),loginResponse);
routerSessions.get('/current',passportCallback('current'), getCurrentUser);
routerSessions.post('/logout',logout);

export default routerSessions;