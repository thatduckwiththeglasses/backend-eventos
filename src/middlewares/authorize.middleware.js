import { eventsService } from "../dependencies/index.js";

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'No tenés permisos para realizar esta acción'
      })
    }

    next()
  }
};

export const authorizeEventOwnerOrAdmin = async (req, res, next) => {
  const { eventId } = req.params

  const event = await eventsService.findEventById(eventId);

  if (!event) {
    return res.status(404).json({
      status: 'error',
      message: 'Evento no encontrado'
    })
  }

  const isAdmin = req.user.role === 'admin'
  const isOwner = event.organizer.toString() === req.user._id.toString()

  if (!isAdmin && !isOwner) {
    return res.status(403).json({
      status: 'error',
      message: 'No tenés permisos para modificar este evento'
    })
  }

  req.event = event

  next()
};