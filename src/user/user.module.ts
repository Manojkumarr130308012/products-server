import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'user_mas', schema: UserSchema }])],
    providers: [UserService],
    controllers: [UserController],
  })
  
export class UserModule {}
