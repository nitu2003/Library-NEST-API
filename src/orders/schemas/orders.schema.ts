import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({
    timestamps: true
})
export class Orders{
    @Prop({ type: Types.ObjectId, ref: 'users' ,required: true })
    userId: Types.ObjectId;

    @Prop({ type: Types.ObjectId,ref:'books', required: true })
    bookId: Types.ObjectId;

    @Prop({ required: true ,index: true})
    phone: string;
    
    @Prop()
    bookTitle: string;

    @Prop()
    returnedDate: Date;

    @Prop({ default: Date.now })
    issuedDate: Date;

    @Prop()
    isDeleted : boolean
}

export const OrdersSchema = SchemaFactory.createForClass(Orders)