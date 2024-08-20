import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateServiceDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: "string", format: "binary" })
    image: string;

    @ApiPropertyOptional({ type: "string", format: "binary" })
    video: string;

    @ApiPropertyOptional()
    @IsDate()
    createdAt: Date;
  
    @ApiPropertyOptional()
    @IsDate()
    updatedAt: Date;
  
    @ApiPropertyOptional()
    @IsDate()
    deletedAt: Date;


}

export class UpdateServiceDto {
    @ApiPropertyOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional()
    @IsString()
    description: string;

    @ApiPropertyOptional()
    @IsString()
    image: string;

    @ApiPropertyOptional()
    @IsString()
    video: string;

    @ApiPropertyOptional()
    @IsDate()
    createdAt: Date;
  
    @ApiPropertyOptional()
    @IsDate()
    updatedAt: Date;
  
    @ApiPropertyOptional()
    @IsDate()
    deletedAt: Date;
}