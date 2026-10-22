import { EventModel } from "../../data/models/event.model.js";

export class EventsMongoDao {
    async getAll(category, maxPrice, limit, page){
        return EventModel.paginate({
            ...( category && { category } ),
            ...( maxPrice && { price: { $lte: Number(maxPrice) } } )
        },{ limit, page, lean: true });
    };

    async getById(id){
        return EventModel.findById(id);
    }

    async create(data) {
        return EventModel.create(data);
    }

    async edit(id,data){
        return EventModel.findByIdAndUpdate(id,data);
    }

    async delete(id){
        return EventModel.findByIdAndDelete(id);
    }

    async reserveCapacity(id, quantity){
        return EventModel.findByIdAndUpdate(id,
            {
                _id: id,
                available: true,
                $set: {
                    $lte: [{ $add: ["$reserved", quantity]}, "$capacity"]
                },
            },
            { $inc: {reserved: quantity}},
            {new: true}
        )
    }

    async releaseCapacity(id, quantity){
        return EventModel.findByIdAndUpdate(id,
            {
                _id: id,
                $expr: {
                    $gte: ["$reserved", quantity]
                },
            },
            { $inc: {reserved: - quantity}},
            {new: true}
        )
    }
}