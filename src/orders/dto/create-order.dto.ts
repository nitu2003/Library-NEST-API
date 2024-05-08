import { Types } from 'mongoose';

export class CreateOrderDto {
  userId: Types.ObjectId;
  readonly phone: string;
  readonly bookId: Types.ObjectId;
  readonly bookTitle: string;
  readonly issuedDate: Date;
  readonly returnedDate: Date;
  readonly userName: string;
  readonly email: string;
}

export class OrderDto {
    readonly userId: Types.ObjectId;
    readonly phone: string;
    readonly bookId: Types.ObjectId;
    readonly bookTitle: string;
    readonly issuedDate: Date;
    readonly returnedDate: Date;
  }
