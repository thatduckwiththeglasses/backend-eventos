import { userService } from "../dependencies/index.js"
import { sendError } from "../utils/responseMessages.js";

export const register = async (req, res) => {
  try {
    const newUser = await userService.register(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Usuario registrado correctamente',
      payload: {
        id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        role: newUser.role
      }
    })
  } catch (error) {
    return sendError(res,error,error.message)
  }
}

