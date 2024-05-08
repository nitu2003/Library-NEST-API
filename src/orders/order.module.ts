import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { Orders, OrdersSchema } from './schemas/orders.schema';
import { OrderService } from './order.service';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Orders.name, schema: OrdersSchema }]) , UserModule],
  controllers: [OrderController],
  providers: [OrderService ]
})
export class OrderModule {}
