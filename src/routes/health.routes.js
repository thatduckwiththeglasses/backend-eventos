import { Router } from "express"
import { getHealth } from "../controllers/health.controller.js";

const routerHeatlh = Router();

routerHeatlh.get('/',getHealth)

export default routerHeatlh;