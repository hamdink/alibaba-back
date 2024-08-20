import { Body, Controller, Post, UploadedFile, UseInterceptors, Get, Put, Param, Delete} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { imageAndPdfFilter, storage } from "src/configuration/multer.config";
import { CreateReviewDto, Review, UpdateReviewDto } from "src/core";
import { ReviewUseCases } from "src/use-cases/review/review.use-case";

@ApiTags("api/review")
@Controller("api/review")  
export class ReviewController{

    constructor(
        private reviewUseCases: ReviewUseCases,
    ){}

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @ApiBearerAuth()
    @UseInterceptors(
        FileInterceptor("image", {
          storage: storage,
          fileFilter: imageAndPdfFilter,
        }),
      )
    @Post()
    async createReview(@Body() review: CreateReviewDto,
    @UploadedFile() file: Express.Multer.File,
    ): Promise<Review> {
        return this.reviewUseCases.createReview({...review}, file);
    }

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @ApiBearerAuth()
    @Get()
    async getAllReviews(): Promise<Review[]> {
        return this.reviewUseCases.getAllReviews();
    }

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @ApiBearerAuth()
    @Get(':id')
    async getReviewById(@Param("id") id: string): Promise<Review> {
        return this.reviewUseCases.getReviewById(id);
    }

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @ApiBearerAuth()
    @Get('user/:userId')
    async getReviewByUserId(@Param("userId") userId: string): Promise<Review[]> {
        return this.reviewUseCases.getReviewByUserId(userId);
    }

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @ApiBearerAuth()
    @Put(':id')
    async updateReview(@Param('id') id: string, @Body() review: UpdateReviewDto,
    @UploadedFile() file: Express.Multer.File): Promise<Review> {
        return this.reviewUseCases.updateReview(id, {...review}, file);
    }

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @ApiBearerAuth()
    @Delete(':id')
    async deleteReview(@Param('id') id: string): Promise<boolean> {
        return this.reviewUseCases.deleteReview(id);
    }
    
   

}