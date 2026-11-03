export class UserRepository {

    constructor(dao){
        this.dao = dao;
    }


    async getAll(){
        return this.dao.getAll()
    }

    async getByEmail(email){
        return this.dao.getByEmail(email)
    }

    async register(data){
        return this.dao.create(data)
    }

    async getById(id){
        return this.dao.getById(id)
    }

    async deleteUser(id){
        return this.dao.delete(id)
    }

}