<?php

namespace App\Http\Controllers;

use App\Http\Repositories\ReviewRepository;
use App\Http\Resources\ReviewCollection;
use App\Http\Resources\ReviewResource;
use Illuminate\Http\Request;
use App\Models\Book;

class ReviewAPIController extends Controller
{
    protected $reviewRepository;

    public function __construct(ReviewRepository $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'review_title' => 'required', 'rating_start' => 'required',
        ]);
        return new ReviewResource($this->reviewRepository->createBookReview($request));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $limit = 20;
        if ($request->input('limit')) {
            $limit = $request->input('limit');
        }
        return new ReviewCollection($this->reviewRepository->getAllBookReviews($id, $limit));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'review_title' => 'required', 'rating_start' => 'required',
        ]);
        return new ReviewResource($this->reviewRepository->updateBookReview($request, $id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return new ReviewResource($this->reviewRepository->deleteBookReview($id));
    }

    public function showBookReviewsSortByDate(Request $request)
    {
        $this->validate($request, [
            'id' => 'required'
        ]);
        $id = $request->input('id');
        $newest = 'true';
        if ($request->input('newest')) {
            $newest = $request->input('newest');
        }
        $limit = 20;
        if ($request->input('limit')) {
            $limit = $request->input('limit');
        }
        return $this->reviewRepository->getBookReviewsSortByDate($id, $newest, $limit);
    }
}
