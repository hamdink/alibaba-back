import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type PartnerDocument = Partner & Document;
@Schema()
export class Partner{

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop({required: true})
    image: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    deletedAt: Date;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);