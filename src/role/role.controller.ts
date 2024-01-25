import { Controller } from '@nestjs/common';
import { RoleService } from './role.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @MessagePattern({ cmd: 'create_role' })
    async newUser(user: any) {
      const result = await this.roleService.createNewRoles(user);
      if (!result) {
        return 'role already exists';
      } else {
        return result;
      }
    }
  
    @MessagePattern({ cmd: 'get_roleby_id' })
    async getRoleById(roleId: string) {
      return await this.roleService.getRoleByID(roleId);
    }
  
    @MessagePattern({ cmd: 'get_all_roles' })
    async getAllRoles() {
      return await this.roleService.getAllRoles();
    }


}
