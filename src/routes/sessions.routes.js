import { Router } from "express"
import { register } from "../controllers/user.controller.js"
import { createUserSchema } from "../validations/users.validation.js";
import { validate } from "../middlewares/validation.middleware.js";

const routerSessions = Router()

routerSessions.post('/register',validate(createUserSchema), register);

export default routerSessions;