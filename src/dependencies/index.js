import { EventsMongoDao } from "../dao/mongo/events.mongodb.dao.js";
import { EventsRepository } from "../repositories/events.repository.js";
import { EventsService } from "../services/events.service.js";
import { UserMongoDao } from "../dao/mongo/user.mongodb.dao.js";
import { UserRepository } from "../repositories/user.repository.js";
import { UserService } from "../services/user.service.js";

const eventDao = new EventsMongoDao();
const eventsRepository = new EventsRepository(eventDao);

const userDao = new UserMongoDao();
const userRepository = new UserRepository(userDao);

export const userService = new UserService(userRepository);
export const eventsService = new EventsService(eventsRepository);

