import { verifyToken } from "../utils/jwt.js";
import { sendError } from "../utils/responseMessages.js";
import { CustomError } from "../utils/customError.js";

export const authToken = (req,res,next) => {
    try{
        const token = req.cookies.currentUser

        if (!token) throw new CustomError(401,"El token no es autentico")
        
        const decoded = verifyToken(token);

        if (!decoded) throw new CustomError(401,'Token invalido o modificado')

        req.user = decoded

        next()
    } catch(error) {
        return sendError(res,error,'Token invalido o expirado')
    }
}