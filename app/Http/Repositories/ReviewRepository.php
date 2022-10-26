<?php

namespace App\Http\Repositories;

use App\Http\Resources\ReviewResource;
use App\Models\Review;
use Illuminate\Support\Carbon;


class ReviewRepository extends BaseRepository
{
    /**
     * Display a listing of the book reviews apply sort and filter.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getBookReviews($request)
    {
        try {
            $id = $request->input('id');
            $params = $request->all();
            $order = $this->getOrder($request);
            $perPage = $this->getPerPage($request);
            $reviews = Review::where('book_id', $id)
                ->applySortFilter($params, $order);
            $data = $reviews->get();
            $average_rating_star = $this->getAverageStar($data);
            $count_reviews = $this->getCountReviews($data);
            return response()->json([
                'reviews' => $reviews->paginate($perPage),
                'average_rating_star' => $average_rating_star,
                'count_reviews' => $count_reviews
            ]);
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

    /**
     * Get average star of book reviews.
     *
     * @param  \Illuminate\Database\Eloquent\Collection  $data
     * @return int $average_rating_star
     */
    public function getAverageStar($data)
    {
        try {
            $data = json_decode($data);
            $average_rating_star = 0;
            if (count($data) != 0) {
                foreach ($data as $key => $value) {
                    $average_rating_star += $value->rating_start;
                }
                $average_rating_star = $average_rating_star / count($data);
                return $average_rating_star;
            }
            return $average_rating_star;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Get number of reviews for each star value.
     *
     * @param  \Illuminate\Database\Eloquent\Collection  $data
     * @return array $count_reviews
     */
    public function getCountReviews($data)
    {
        try {
            $data = json_decode($data);
            $count_reviews = array(count($data), 0, 0, 0, 0, 0);
            if (count($data) != 0) {
                foreach ($data as $key => $value) {
                    $count_reviews[$value->rating_start] += 1;
                }
                return $count_reviews;
            }
            return $count_reviews;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
