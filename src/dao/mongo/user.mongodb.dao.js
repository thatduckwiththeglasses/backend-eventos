import { UserModel } from "../../data/models/user.model.js";

export class UserMongoDao {

    async getAll(){
        return UserModel.find().lean();
    }
    
    async getByEmail(email){
        return UserModel.findOne({ email: email }).select('+password').lean();
    }

    async create(data){
        return UserModel.create(data);
    }

    async getById(id){
        return UserModel.findById(id);
    }
    
    async edit(id,data){
        return UserModel.findByIdAndUpdate(id,data);
    }

    async delete(id){
        return UserModel.findByIdAndDelete(id);
    }
}