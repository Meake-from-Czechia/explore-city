export class RatingAvgDto{
    averageRating: number;
    ratingsCount: number;

    constructor(avgRating: number, ratingsCount: number) {
        this.averageRating = avgRating;
        this.ratingsCount = ratingsCount;
    }

}