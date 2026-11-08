import { verifyToken } from "../utils/jwt.js";
import { sendError } from "../utils/responseMessages.js";
import { CustomError } from "../utils/customError.js";
import { eventsService } from "../dependencies/index.js";

export const authToken = (req,res,next) => {
    try{
        const token = req.cookies.currentUser

        if (!token) throw new CustomError("El token no es autentico")
        
        const decoded = verifyToken(token);

        req.user = decoded

        next()
    } catch(error) {
        return sendError(res,error,'Token invalido o expirado')
    }
};

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

