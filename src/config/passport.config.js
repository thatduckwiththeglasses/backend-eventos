import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { userService } from '../dependencies/index.js';
import { UserModel } from '../data/models/user.model.js';
import { createHash, isValidPassword } from '../utils/passwordUtils.js';
import { cookieExtractor } from '../utils/jwt.js';

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const { first_name, last_name } = req.body

        if (!first_name || !last_name || !email || !password) {
          return done(null, false, {
            message: 'Todos los campos son obligatorios'
          })
        }

        const normalizedEmail = email.toLowerCase().trim()

        const userExists = await userService.getUserByEmail(normalizedEmail)

        if (userExists) {
          return done(null, false, {
            message: 'Ya existe un usuario registrado con ese email'
          })
        }

        const hashedPassword = await createHash(password)

        const newUser = await UserModel.create({
          first_name,
          last_name,
          email: normalizedEmail,
          password: hashedPassword,
          role: 'user'
        })

        return done(null, newUser)
      } catch (error) {
        return done(error)
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
           
 try {
        const normalizedEmail = email.toLowerCase().trim()

        const user = await userService.getUserByEmail(normalizedEmail)

               
   if (!user) {
          return done(null, false, {
            message: "Credenciales inválidas"
          });
        }

        const validPassword = await isValidPassword(
          password,
          user.password
        )

               
   if (!validPassword) {
          return done(null, false, {
            message: "Credenciales inválidas"
          });
        }

        return done(null, user)
          
} catch (error) {
        return done(error)
      }
    }
  )
);

passport.use(
  'current',
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await userService.getUserById(jwtPayload.id)

        if (!user) {
          return done(null, false, {
            message: "Usuario no encontrado"
          })
        }

        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
);

