import { userService } from "../dependencies/index.js"

function sendError(res, error, fallbackMessage) {
    const statusCode = error.statusCode ?? 500;

    if (statusCode === 500) console.log(error)
        return res.status(statusCode).json({
            status: "ERROR",
            message: statusCode === 500 ? fallbackMessage : error.message,
        })
};

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
    return sendError(res,error,'Error interno del servidor')
  }
}

