import { Router } from "express";
import { createEvent, editEvent, getAllEvents, getEvent, removeEvent } from "../controllers/events.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createEventSchema, updateEventSchema} from "../validations/events.validation.js";


const routerEvents = Router();

routerEvents.get('/',getAllEvents);

routerEvents.get('/:id',getEvent);

routerEvents.post('/',validate(createEventSchema),createEvent);

routerEvents.put('/:id',validate(updateEventSchema),editEvent);

routerEvents.delete('/:id',removeEvent);

export default routerEvents;