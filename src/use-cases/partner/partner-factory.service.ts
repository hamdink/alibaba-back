import { Injectable } from "@nestjs/common";
import { CreatePartnerDto, Partner, UpdatePartnerDto } from "src/core";

@Injectable()
export class PartnerFactoryService {
    createNewPartner(createPartner: CreatePartnerDto){
        const newPartner = new Partner();
        newPartner.name = createPartner.name;
        newPartner.image = createPartner.image;
        newPartner.description = createPartner.description;
        newPartner.createdAt = new Date();
        return newPartner;
    }

    updatePartner(updatePartner: UpdatePartnerDto){
        const updatedPartner = new Partner();
        updatedPartner.name = updatePartner.name;
        updatedPartner.image = updatePartner.image;
        updatedPartner.description = updatePartner.description;
        updatedPartner.updatedAt = new Date();

        return updatedPartner;
    }
}
