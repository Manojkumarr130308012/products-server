import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from './role.schema';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'role_mas', schema: RoleSchema }])],
    providers: [RoleService],
    controllers: [RoleController],
  })
export class RoleModule {}
