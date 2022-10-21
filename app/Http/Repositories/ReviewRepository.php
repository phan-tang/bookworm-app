<?php

namespace App\Http\Repositories;

use App\Models\Review;
use App\Models\Book;
use Illuminate\Support\Carbon;

class ReviewRepository
{
    public function getAllBookReviews($id, $limit)
    {
        try {
            $reviews = Review::where('book_id', $id)->paginate($limit);
            return $reviews;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function createBookReview($request)
    {
        try {
            $review = new Review();
            $review->review_title = $request->input('review_title');
            $review->review_details = $request->input('review_details');
            $review->rating_start = $request->input('rating_start');
            $review->review_date = Carbon::now();
            $review->save();
            return $review;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function updateBookReview($request, $id)
    {
        try {
            $review = Review::find($id);
            $review->review_title = $request->input('review_title');
            $review->review_details = $request->input('review_details');
            $review->rating_start = $request->input('rating_start');
            $review->save();
            return $review;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function deleteBookReview($id)
    {
        try {
            $review = Review::find($id);
            $review->delete();
            return $review;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getBookReviewsSortByDate($id, $newest, $limit)
    {
        if ($newest === 'false') {
            return Review::where('book_id', $id)->orderBy('review_date')->paginate($limit);
        }
        return Review::where('book_id', $id)->orderBy('review_date', 'desc')->paginate($limit);
    }
}
