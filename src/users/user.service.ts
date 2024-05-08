import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Users } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name)
    private userModel: mongoose.Model<Users>,
  ) {}

  async create(user: CreateUserDto): Promise<CreateUserDto> {
    const res = await this.userModel.create(user);
    return res;
  }

  async findByPhone(phone: string): Promise<CreateUserDto> {
    const user = await this.userModel.findOne({
      phone: phone,
      isActive: { $ne: false },
    });
    return user;
  }

  async updateByPhone(phone: string, user: CreateUserDto): Promise<CreateUserDto> {
    try {
      return await this.userModel.findOneAndUpdate(
        { phone: phone },
        {
          name: user.name,
          email: user.email,
        }
        
      );
    } catch (error) {
      console.log(error)
      throw new BadRequestException(
        'Unable to update the user'
      )
    }

  }
  async deleteByPhone(phone: string): Promise<{ message: string }> {
    const user = await this.userModel.findOneAndUpdate(
      { phone: phone },
      {
        isActive: false,
      },
    );

    if (!user) {
      throw new BadRequestException('User with given phone not found.');
    }

    return { message: 'Document Deleted successfully' };
  }
}
