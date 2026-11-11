import { verifyToken } from "../utils/jwt.js";
import { sendError } from "../utils/responseMessages.js";
import { CustomError } from "../utils/customError.js";

export const authToken = (req,res,next) => {
    try{
        const token = req.cookies.currentUser

<<<<<<< HEAD
        if (!token) throw new CustomError(401,"El token no es autentico")
=======
        if (!token) throw new CustomError("El token no es autentico")
>>>>>>> entrega4
        
        const decoded = verifyToken(token);

        if (!decoded) throw new CustomError(401,'Token invalido o modificado')

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
