import { Router } from "express"
import { register, login, logout } from "../controllers/user.controller.js"
import { createUserSchema } from "../validations/users.validation.js";
import { validate } from "../middlewares/validation.middleware.js";
import { authToken } from "../middlewares/auth.middleware.js";
import passport from 'passport';
import { loginResponse, registerResponse, getCurrentUser } from "../controllers/session.controller.js";

const routerSessions = Router()

routerSessions.post('/register',passport.authenticate('register', {
    session: false
}), registerResponse);
routerSessions.post('/login',passport.authenticate('login',{
    session: false
}),loginResponse);
routerSessions.get('/current',passport.authenticate('current',{
    session: false
}), getCurrentUser);
routerSessions.post('/logout',logout);

export default routerSessions;