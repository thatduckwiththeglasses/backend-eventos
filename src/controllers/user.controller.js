import { userService } from "../dependencies/index.js"
import { isValidPassword } from "../utils/passwordUtils.js";
import { generateToken } from "../utils/jwt.js";

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
    return sendError(res,error,'Error al registrar usuario')
  }
};

export const login = async (req, res) => {
  try{
      const { email, password } = req.body

      if(!email || !password) {
        return res.status(400).json({
                  status: 'error',
                  message: 'Email y contraseña son obligatorios'
                })
      }
    
      const normalizedEmail = email.toLowerCase().trim();
    
      const supposedUser = await userService.getUserByEmail(normalizedEmail);
    
      if (!supposedUser) {
        return res.status(401).json({
          status: 'error',
          message: 'Credenciales inválidas'
        })
      }

      const validPassword = await isValidPassword(password, supposedUser.password)
    
      if (!validPassword) {
          return res.status(401).json({
            status: 'error',
            message: 'Credenciales inválidas'
          })
      }
    
      const tokenUser = {
            id: supposedUser._id,
            email: supposedUser.email,
            role: supposedUser.role
      }
    
      const token = generateToken(tokenUser);

      return res.status(200).json({
            status: 'success',
            message: 'Login correcto'
      })
    } catch(error){
      return sendError(res,error,'Error al ingresar a la cuenta')
    }

}

