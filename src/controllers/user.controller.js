import { userService } from "../services/user.service.js"
import { createHash, isValidPassword } from "../utils/passwordUtils.js";

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
    const { first_name, last_name, email, password } = req.body

    if (!first_name || !last_name || !email || !password) {
      return sendError(400,'Todos los campos son obligatorios')
    }

    const normalizedEmail = email.toLowerCase().trim()

    const userExists = await UserModel.findOne({ email: normalizedEmail })

    if (userExists) {
      return sendError(409,'Ya existe un usuario registrado con ese email')
    }

    const hashedPass = await createHash(password);

    const newUser = await UserModel.create({
      first_name,
      last_name,
      email: normalizedEmail,
      password: hashedPass,
      role: 'user'
    })

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
    sendError(500,'Error interno del servidor')
  }
}

