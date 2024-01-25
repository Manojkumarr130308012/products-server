import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern({ cmd: 'register' })
    async newUser(user: any) {      
      return await this.userService.createNewUser(user);
    }
  
    @MessagePattern({ cmd: 'get_userby_id' })
    async getUserById(userId: string) {
      return await this.userService.getUserByID(userId);
    }

    @MessagePattern({ cmd: 'get_userby_any' })
    async getUserByAny(data: any) {
      return await this.userService.getUserByAny(data);
    }


    @MessagePattern({ cmd: 'login' })
    async Userlogin(user: any) {
      return await this.userService.UserLogin(user);
    }
  
    @MessagePattern({ cmd: 'get_all_users' })
    async getAllUsers() {
      return await this.userService.getAllUsers();
    }


    @MessagePattern({ cmd: 'update_user' })
    async updateUsers(data:any) {
      return await this.userService.updateUser(data.id,data.user);
    }


    @MessagePattern({ cmd: 'delete_user' })
    async deleteUsers(userId: string) {
      return await this.userService.deleteUser(userId);
    }

    @MessagePattern({ cmd: 'aggregation' })
    async aggregation() {
      return await this.userService.aggregation();
    }

}
