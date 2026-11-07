import { verifyToken } from "../utils/jwt.js";
import { sendError } from "../utils/responseMessages.js";
import { CustomError } from "../utils/customError.js";

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
