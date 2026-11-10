import { eventsService } from "../dependencies/index.js";

import { sendError } from "../utils/responseMessages.js";

export const getAllEvents = async (req, res)  => {
    try{
        const {
          category,
          status,
          location,
          fromDate,
          toDate,
          search,
          page = 1,
          limit = 10,
          sort = 'date'
        } = req.query
        const filter = {}
        if (category) {
          filter.category = category
        }
        if (status) {
          filter.status = status
        }
        if (location) {
          filter.location = {
            $regex: location,
            $options: 'i'
          }
        }
        if (fromDate || toDate) {
          filter.date = {}
          if (fromDate) {
            filter.date.$gte = new Date(fromDate)
          }
          if (toDate) {
            filter.date.$lte = new Date(toDate)
          }
        }
        if (search) {
          filter.$or = [
            {
              title: {
                $regex: search,
                $options: 'i'
              }
            },
            {
              description: {
                $regex: search,
                $options: 'i'
              }
            }
          ]
        }
        filter.pageNumber = Number(page)
        filter.limitNumber = Math.min(Number(limit) || 10, 50)
        filter.skip = (filter.pageNumber - 1) * filter.limitNumber

        const events = await eventsService.getEventsByFilter(filter);

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
            sendError(res, 404,"No se encontro el evento");
        } else { 
            res.status(200).json({
                status: "sucess",
                payload: event,
            });
        }
    } catch(error){
        return sendError(res, error, "No se pudo obtener el evento");
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
        return sendError(res, error, "No se pudo crear el evento");
    }
};

export const editEvent = async (req, res) => {
    try{
        const { id } = req.params;

        const updateEvent = await eventsService.editEvent(id,req.body);

        if(updateEvent === null){
            return sendError(res, 404,"Evento no encontrado")
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
            return sendError(res, 404,"Evento no encontrado")
        };

        res.status(200).json({
            status: "success",
            payload: deletedEvent
        });
    } catch(error) {
       return sendError(res, error, "No se pudo eliminar el evento")
    }
};