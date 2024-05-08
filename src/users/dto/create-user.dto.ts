import { Types } from "mongoose";

export class CreateUserDto{
    readonly _id ?: Types.ObjectId
    readonly name: string;
    readonly phone: string;
    readonly email: string;
}