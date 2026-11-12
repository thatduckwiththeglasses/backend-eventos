import { createHash, isValidPassword } from "../utils/passwordUtils.js";
import { CustomError } from "../utils/customError.js";

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
        
            const normalizedEmail = email.toLowerCase().trim()
        
            const userExists = await this.getUserByEmail(normalizedEmail);
        
            if (userExists) throw new CustomError(409,"Ya existe un usuario registrado con ese email")
        
            const newUser = await this.repository.register({
              first_name,
              last_name,
              email: normalizedEmail,
              password: password,
              role: 'user'
            });

        return newUser;
    }

    async getUserById(id){
        return this.repository.getById(id);
    }
}