import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user_mas') private readonly userModel: mongoose.Model<User>,
  ) {}

  getUserByID(userID: string) {
    return this.userModel.findById(userID).exec();
  }

  getUserByAny(data: any) {
    console.log(data)
    return this.userModel.findOne(data).exec();
  }

  getAllUsers(): Promise<User[]> {
    const users = this.userModel.find().exec();
    return users;
  }

  async createNewUser(user: any) {
    convertIdsToObjectIds(user);
   const userDetails = await this.userModel
      .create(user)
      .then((res) => res)
      .catch((err) => err);

      return userDetails;
  }

  async UserLogin(user: any) {
    let userfield;
    let userfieldvalue;
    removeField(user,"password");
    Object.keys(user).forEach((key) => {
      userfield = key;
      userfieldvalue = user[key];
    });
    const users =await this.userModel.find();

    console.log(users)

    const userlogin = users.find((user) => user[userfield] === userfieldvalue);
    console.log(userlogin)


    if (userlogin) {
      if (userlogin){
        return { success: true, message: 'Success',response: [userlogin] };
      } else{
        return { success: false, message: 'Invalid credentials' }
      }
  };

  }


  deleteUser(userID: string) {
    return this.userModel.deleteOne({_id:userID}).exec();
  }

  updateUser(userID: string,data:any) {
    return this.userModel.updateOne({_id:userID},data).exec();
  }

  async aggregation(): Promise<User[]> {
    const users = await this.userModel.aggregate([
        {
          $lookup: {
            from: 'role_mas',  // The collection to join with
            localField: 'role_id',  // The field from the current collection
            foreignField: '_id',   // The field from the other collection
            as: 'role_Details',            // The alias for the joined data
          },
        }
      ]);
      
    return users;
  }



  
}


function convertIdsToObjectIds(obj) {
  // Recursively convert string values to ObjectId
  const convertFields = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        convertFields(obj[key]);
      } else if (typeof obj[key] === 'string' && mongoose.Types.ObjectId.isValid(obj[key])) {
        obj[key] = new mongoose.Types.ObjectId(obj[key]);
      }
    }
  };

  convertFields(obj);
}

function removeField(jsonObj, fieldToRemove) {
  if (jsonObj.hasOwnProperty(fieldToRemove)) {
    delete jsonObj[fieldToRemove];
  }
}