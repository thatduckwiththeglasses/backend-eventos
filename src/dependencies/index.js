import path from "node:path";
import { fileURLToPath } from "node:url";
import { EventsMongoDao } from "../dao/mongo/events.mongodb.dao.js";
import { BookingsMongoDao } from "../dao/mongo/bookings.mongodb.dao.js";
import { EventsRepository } from "../repositories/events.repository.js";
import { EventsService } from "../services/events.service.js";
import { BookingsRepository } from "../repositories/bookings.repository.js";
import { BookingsService } from "../services/bookings.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicesPath = path.join(__dirname, "..", "data", "services.json");

const bookingsPath = path.join(__dirname, "..", "data", "bookings.json");

const eventDao = new EventsMongoDao();
const eventsRepository = new EventsRepository(eventDao);

export const eventsService = new EventsService(eventsRepository);

const bookingDao = new BookingsMongoDao();
const bookingsRepository = new BookingsRepository(bookingDao);

export const bookingsService = new BookingsService(bookingsRepository);