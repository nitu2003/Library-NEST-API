import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, Users } from './schemas/users.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
