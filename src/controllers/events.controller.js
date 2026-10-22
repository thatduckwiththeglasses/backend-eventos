import { eventsService } from "../dependencies/index.js";

function sendError(res, error, fallbackMessage) {
    const statusCode = error.statusCode ?? 500;

    if (statusCode === 500) console.log(error)
        return res.status(statusCode).json({
            status: "ERROR",
            message: statusCode === 500 ? fallbackMessage : error.message,
        })
}

export const getAllEvents = async (req, res)  => {
    try{

        const events = await eventsService.getEvents(req.query);

        return res.status(200).json({
                status: "sucess",
                count: events.length,
                payload: events,
            });
    } catch(error) {
        return sendError(res,error, "no se pudieron leer los servicios")
    }
};

export const getEvent = async (req, res) => {
    try{
        const { id } = req.params;

        const event = await eventsService.getEventById(id);

        if (event === null){
            res.status(404).json({
            status: "---ERROR---",
            message: "No se encontro el servicio",
            });
        } else { 
            res.status(200).json({
                status: "sucess",
                payload: event,
            });
        }
    } catch(error){
        return sendError(res, error, "No se pudo obtener el servicio");
    }
};

export const createEvent = async (req , res) => {
    try{
        const newEvent = await eventsService.createEvent(req.body);

        res.status(201).json({
            status: "success",
            payload: newEvent,
        });
    } catch(error) {
        return sendError(res, error, "No se pudo crear el servicio");
    }
};

export const editEvent = async (req, res) => {
    try{
        const { id } = req.params;

        const updateEvent = await eventsService.editEvent(id,req.body);

        if(updateEvent === null){
            return res.status(404).json({
                status: "--ERROR--",
                message: "Servicio no encontrado"
            })
        };

        res.status(200).json({
            status: "success",
            payload: updateEvent
        });
    } catch(error) {
        return sendError(res, error, "No se pudo actualizar el evento");
    }
};

export const removeEvent = async (req, res) => {
    try{
        const { id } = req.params;
        const deletedEvent = await eventsService.deleteEvent(id);

        if(deletedEvent === null){
            return res.status(404).json({
                status: "--ERROR--",
                message: "Evento no encontrado"
            })
        };

        res.status(200).json({
            status: "success",
            payload: deletedEvent
        });
    } catch(error) {
       return sendError(res, error, "No se pudo eliminar el evento")
    }
};