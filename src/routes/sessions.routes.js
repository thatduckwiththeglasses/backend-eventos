import { Router } from "express"
import { register, login, getCurrentUser, logout } from "../controllers/user.controller.js"
import { createUserSchema } from "../validations/users.validation.js";
import { validate } from "../middlewares/validation.middleware.js";
import { authToken } from "../middlewares/auth.middleware.js";

const routerSessions = Router()

routerSessions.post('/register',validate(createUserSchema), register);
routerSessions.post('/login',login);
routerSessions.get('/current',authToken, getCurrentUser);
routerSessions.post('/logout',logout);

export default routerSessions;