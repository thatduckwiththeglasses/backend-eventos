export class UserRepository {

    constructor(dao){
        this.dao = dao;
    }

    async getByEmail(email){
        this.dao.findByEmail(email)
    }
}