import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/get-user/:phone')
  async getUser(
    @Param('phone')
    phone: string,
  ): Promise<CreateUserDto> {
    return this.userService.findByPhone(phone);
  }

  @Post('/create-user')
  async createUser(
    @Body()
    user: CreateUserDto,
  ): Promise<CreateUserDto> {
    return this.userService.create(user);
  }

  @Patch('/update-user/:phone')
  async updateUser(
    @Param('phone')
    phone: string, 
    @Body()
    user: CreateUserDto,
  ): Promise<CreateUserDto> {
    return this.userService.updateByPhone( phone, user);
  }

  @Delete('/remove-user/:phone')
  async deleteUser(
    @Param('phone')
    phone: string,
  ): Promise<{ message: string }> {
    return this.userService.deleteByPhone(phone);
  }
}
