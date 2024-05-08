import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CreateOrderDto, OrderDto } from './dto/create-order.dto';
import { Orders } from './schemas/orders.schema';
import { UserService } from 'src/users/user.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Orders.name)
    private orderModel: mongoose.Model<Orders>,
    private userService: UserService,
  ) {}

  async create(order: CreateOrderDto): Promise<Partial<CreateOrderDto>> {
    try {
      let user = await this.userService.findByPhone(order.phone);
      if (!user) {
        user = await this.userService.create({
          name: order.userName,
          phone: order.phone,
          email: order.email,
        });
        order.userId = user._id
      }
  
      const res = await this.orderModel.create(order);
      return res;

    } catch (error) {
      console.log(error)
      throw new BadRequestException('Error while creating order');
    }
    
   
  }

  async findByUserPhone(phone: string): Promise<OrderDto[]> {
    const order = await this.orderModel.find({
      phone: phone,
      isDeleted: { $ne: true },
    });

    if (!order) {
      throw new BadRequestException('Order with given phone not found.');
    }
    return order;
  }

  async updateOrderAsReturned(
    id: string,
  
  ): Promise<CreateOrderDto> {
    try {
      return await this.orderModel.findByIdAndUpdate(
        { _id: id },
        {
          returnedDate: new Date(),
        }
      );
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Unable to update the order');
    }
  }
  async deleteByPhone(phone: string): Promise<{ message: string }> {
    const order = await this.orderModel.findOneAndUpdate(
      { phone: phone },
      {
        isDeleted: true,
      },
    );

    if (!order) {
      throw new BadRequestException('Order with given phone not found.');
    }

    return { message: 'Document Deleted successfully' };
  }
}
