import { createHash, isValidPassword } from "../utils/passwordUtils.js";

export class UserService {

    constructor (repository){
        this.repository = repository;
    }

    async getAllUsers(){
        return this.repository.getAll()
    }
    
    async getUserByEmail (email){
        return this.repository.getByEmail(email);
    }

    async register(data){
        const { first_name, last_name, email, password } = data;

        if (!first_name || !last_name || !email || !password) {
              return sendError(400,'Todos los campos son obligatorios')
            }
        
            const normalizedEmail = email.toLowerCase().trim()
        
            const userExists = await this.getUserByEmail(normalizedEmail);
        
            if (userExists) throw new Error('Ya existe un usuario registrado con ese email')
        
            const hashedPass = await createHash(password);
        
            const newUser = await this.repository.register({
              first_name,
              last_name,
              email: normalizedEmail,
              password: hashedPass,
              role: 'user'
            });

        return this.repository.register(newUser);
    }
}