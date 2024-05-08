import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Users{
    @Prop()
    name: string;
    
    @Prop()
    email: string;

    @Prop({ required: true, unique: true ,index: true})
    phone: string;
    
    @Prop()
    isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(Users)