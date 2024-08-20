import { Injectable } from "@nestjs/common";
import { CreateReviewDto, Review } from "src/core";

@Injectable()
export class ReviewFactoryService {
    createNewReview(createReviewDto: CreateReviewDto): Review{
        const newReview = new Review();
        newReview.userId = createReviewDto.userId;
        newReview.fullName = createReviewDto.fullName;
        newReview.message = createReviewDto.message;
        newReview.rating = createReviewDto.rating;
        newReview.image = createReviewDto.image;
        newReview.createdAt = new Date();
        newReview.updatedAt = new Date();
        return newReview;
    }

    updateReview(updateReviewDto: CreateReviewDto): Review{
        const updatedReview = new Review();
        updatedReview.message = updateReviewDto.message;
        updatedReview.fullName = updateReviewDto.fullName;
        updatedReview.rating = updateReviewDto.rating;
        updatedReview.image = updateReviewDto.image;
        updatedReview.updatedAt = new Date();
        return updatedReview;
    }
}