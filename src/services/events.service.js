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

    async getEventById(id) {
        const event = await this.repository.getById(id);
        if (!event) throw new Error("Evento no encontrado");
        
        return event;
    }

    async createEvent(data) {
        const { name, description, duration, price, category, capacity, available } = data;

        if(!name || !description || !duration || !price || !category || available === undefined) throw new Error("Faltan campos obligatorios")
        if (typeof duration !== "number") throw new Error("Duration debe ser un numero")
         else {
            if (duration <= 0) throw new Error("Duration debe ser mayor que 0")
            }

        if (typeof available !== "boolean") throw new Error("Available debe ser un booleano");

        return this.repository.create({ name, description, duration, price, category, capacity, available })
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