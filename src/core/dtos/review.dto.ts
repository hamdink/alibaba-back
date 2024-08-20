import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";

enum Rating{
    one = "1",
    two = "2",
    three = "3",
    four = "4",
    five = "5"

}
export class CreateReviewDto {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string;

    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fullName: string;

    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    message: string;

    image: string;

    @ApiProperty({ enum: Rating })
    @IsEnum(Rating)
    @IsNotEmpty()
    rating: Rating;

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

export class UpdateReviewDto {
    @ApiPropertyOptional()
    @IsString()
    userId: string;

    @ApiPropertyOptional()
    @IsString()
    fullName: string;

    @ApiPropertyOptional()
    @IsString()
    message: string;

    image: string;

    @ApiPropertyOptional({ enum: Rating })
    @IsEnum(Rating)
    rating: Rating;

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