<?php

namespace App\Http\Controllers;

use App\Http\Repositories\ReviewRepository;
use Illuminate\Http\Request;

class ReviewAPIController extends Controller
{
    protected $reviewRepository;

    public function __construct(ReviewRepository $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }

    /**
     * Store a newly created review in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Http\Resources\ReviewResource
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'review_title' => 'required', 'rating_start' => 'required',
        ]);
        return $this->reviewRepository->createBookReview($request);
    }

    /**
     * Display a listing of the book reviews apply sort and filter.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function showReviews(Request $request)
    {
        return $this->reviewRepository->getBookReviews($request);
    }
}
