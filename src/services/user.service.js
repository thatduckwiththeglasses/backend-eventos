export class UserService {

    constructor (repository){
        this.repository = repository;
    }

    async getUserByEmail (email){
        return this.repository.getByEmail(email);
    }
}