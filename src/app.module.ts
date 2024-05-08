import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { OrderModule } from './orders/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal:true
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    BookModule,
    UserModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
