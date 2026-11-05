import { verifyToken } from "../utils/jwt.js";
import { sendError } from "../utils/responseMessages.js";

export const authToken = (req,res,next) => {
    try{
        const token = req.cookies.currentUser

        if (!token) throw new Error("El token no es autentico")
        
        const decoded = verifyToken(token);

        req.user = decoded

        next()
    } catch(error) {
        return sendError(res,error,'Token invalido o expirado')
    }
}