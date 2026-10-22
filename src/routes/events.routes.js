import { Router } from "express";
import { createEvent, editEvent, getAllEvents, getEvent, removeEvent } from "../controllers/events.controller.js";

const routerEvents = Router();

routerEvents.get('/',getAllEvents);

routerEvents.get('/:id',getEvent);

routerEvents.post('/',createEvent);

routerEvents.put('/:id',editEvent);

routerEvents.delete('/:id',removeEvent);

export default routerEvents;