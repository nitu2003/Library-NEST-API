import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderDto } from './dto/create-order.dto';

@Controller('/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/get-user-order/:phone')
  async getUser(
    @Param('phone')
    phone: string,
  ): Promise<OrderDto[]> {
    return this.orderService.findByUserPhone(phone);
  }

  @Post('/create-order')
  async createUser(
    @Body()
    order :CreateOrderDto,
  ):  Promise<Partial<CreateOrderDto>>  {
    return this.orderService.create(order);
  }

  @Patch('/update-order-as-returned/:id')
  async updateUser(
    @Param('id')
    id: string, 
  ): Promise<CreateOrderDto> {
    return this.orderService.updateOrderAsReturned( id);
  }

  @Delete('/remove-order/:phone')
  async deleteUser(
    @Param('phone')
    phone: string,
  ): Promise<{ message: string }> {
    return this.orderService.deleteByPhone(phone);
  }
}
