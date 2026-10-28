import { EventsMongoDao } from "../dao/mongo/events.mongodb.dao.js";
import { EventsRepository } from "../repositories/events.repository.js";
import { EventsService } from "../services/events.service.js";

const eventDao = new EventsMongoDao();
const eventsRepository = new EventsRepository(eventDao);

export const eventsService = new EventsService(eventsRepository);

