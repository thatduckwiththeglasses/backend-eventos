import { userService } from "../dependencies/index.js"
import { sendError } from "../utils/responseMessages.js";
import { isValidPassword } from "../utils/passwordUtils.js";
import { generateToken } from "../utils/jwt.js";

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

      res.cookie('currentUser', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      })

      return res.status(200).json({
            status: 'success',
            message: 'Login correcto',
            payload: res.cookie.currentUser
      })
    } catch(error){
      return sendError(res,error,'Error al ingresar a la cuenta')
    }

};

export const getCurrentUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    payload: req.user
  })
};

export const logout = (req, res) => {
  res.clearCookie('currentUser')

  res.status(200).json({
    status: 'success',
    message: 'Logout correcto'
  })
}



