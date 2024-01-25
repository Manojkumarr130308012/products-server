import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Role } from './role.schema';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel('role_mas') private readonly roleModel: mongoose.Model<Role>,
      ) {}


      getRoleByID(roleId: any) {
        return this.roleModel.findById(roleId).exec();
      }
    
      getAllRoles(): Promise<Role[]> {
        const users = this.roleModel.find().exec();
        return users;
      }
    
      async createNewRoles(role: any) {
        const exists = await this.roleModel
          .create(role)
          .then((res) => res)
          .catch((err) => err);

          return exists;
      }

     
}
