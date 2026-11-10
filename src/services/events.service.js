import { CustomError } from "../utils/customError.js";

export class EventsService {
    constructor(repository){
        this.repository = repository;
    }

    async getEvents(query = {}) {
        const page = Number(query.page) > 0 ? Number(query.page) : 1;
        const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
        //const filter = {};
        const events = await this.repository.getAll(query.category,query.price,limit,page);

        return events;
    }

    async getEventsByFilter(filter){
        return await this.repository.getData(filter)
    }

    async getEventById(id) {
        const event = await this.repository.getById(id);
        if (!event) throw new CustomError(404,"Evento no encontrado");
        
        return event;
    }

    async createEvent(data) {
        const { title, description, category, date, location, capacity, price } = data;

        const eventDate = new Date(date)
        const now = new Date()

        if (eventDate <= now) throw new CustomError(400,'La fecha del evento debe ser futura')
        
        if (capacity < 0) throw new CustomError(400,'La capacidad debe ser mayor a cero')

        return this.repository.create({ title, description, category, date, location, capacity, price })
    }

    async editEvent(id,data) {
        const updateEvent = this.repository.edit(id,data);

        return updateEvent;
    }

    async deleteEvent(id){
        const retiredEvent = this.repository.delete(id);

        return retiredEvent;
    }
    
    async reserveCapacity(id, reserved){
        return this.repository.reserveCapacity(id, reserved)
    }

    async releaseCapacity(id, quantity){
        return this.repository.releaseCapacity(id, quantity)
    }
}