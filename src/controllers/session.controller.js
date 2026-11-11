import { CurrentUserDTO } from "../dto/currentUser.dto.js";
import { generateToken } from "../utils/jwt.js";

export const registerResponse = async (req,res) => {
    const newUser = req.user;
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
    });
};

export const loginResponse = (req, res) => {
  const tokenUser = {
    id: req.user._id,
    email: req.user.email,
    role: req.user.role
  }

  const token = generateToken(tokenUser)

  const isProduction = process.env.NODE_ENV === 'production'

  res.cookie('currentUser', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    sameSite: isProduction ? 'strict' : 'lax',
    secure: isProduction
  })

  res.status(200).json({
    status: 'success',
    message: 'Login correcto',
    payload: token
  })
};

export const getCurrentUser = (req, res) => {
  
    const currentUser = new CurrentUserDTO(req.user);

    res.status(200).json({
    status: 'success',
    payload: currentUser
  })
};

export const logout = (req, res) => {
  res.clearCookie('currentUser')

  res.status(200).json({
    status: 'success',
    message: 'Logout correcto'
  })
};