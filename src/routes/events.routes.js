import { Router } from "express";
import { createEvent, editEvent, getAllEvents, getEvent, removeEvent } from "../controllers/events.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { authorizeRoles, authorizeEventOwnerOrAdmin } from "../middlewares/auth.middleware.js";
import { passportCallback } from "../middlewares/callbacks.middleware.js";
import { createEventSchema, updateEventSchema} from "../validations/events.validation.js";


const routerEvents = Router();

routerEvents.get('/',getAllEvents);

routerEvents.get('/:id',getEvent);

routerEvents.post('/categories',passportCallback('current'),authorizeRoles('admin'),validate(updateEventSchema),editEvent)

routerEvents.post('/',passportCallback('current'),authorizeRoles('admin','organizer'),validate(createEventSchema),createEvent);

routerEvents.put('/:id',passportCallback('current'),authorizeRoles('admin','organizer'),authorizeEventOwnerOrAdmin,validate(updateEventSchema),editEvent);

routerEvents.delete('/:id',passportCallback('current'),authorizeRoles('admin','organizer'),removeEvent);

export default routerEvents;