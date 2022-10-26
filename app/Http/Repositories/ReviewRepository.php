<?php

namespace App\Http\Repositories;

use App\Http\Resources\ReviewCollection;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use Illuminate\Support\Carbon;


class ReviewRepository extends BaseRepository
{
    /**
     * Display a listing of the book reviews apply sort and filter.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Http\Resources\ReviewCollection
     */
    public function getBookReviews($request)
    {
        try {
            $id = $request->input('id');
            $params = $request->all();
            $order = $this->getOrder($request);
            $perPage = $this->getPerPage($request);
            $reviews = Review::where('book_id', $id)
                ->applySortFilter($params, $order)
                ->paginate($perPage);
            return new ReviewCollection($reviews);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Store a newly created review in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Http\Resources\ReviewResource
     */
    public function createBookReview($request)
    {
        try {
            $review = new Review();
            $review->review_title = $request->input('review_title');
            $review->review_details = $request->input('review_details');
            $review->rating_start = $request->input('rating_start');
            $review->review_date = Carbon::now();
            $review->save();
            return new ReviewResource($review);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Update the specified review in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \App\Http\Resources\ReviewResource
     */
    public function updateBookReview($request, $id)
    {
        try {
            $review = Review::find($id);
            $review->review_title = $request->input('review_title');
            $review->review_details = $request->input('review_details');
            $review->rating_start = $request->input('rating_start');
            $review->save();
            return new ReviewResource($review);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Remove the specified review from storage.
     *
     * @param  int  $id
     * @return \App\Http\Resources\ReviewResource
     */
    public function deleteBookReview($id)
    {
        try {
            $review = Review::find($id);
            $review->delete();
            return new ReviewResource($review);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
