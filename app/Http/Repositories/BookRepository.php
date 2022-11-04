<?php

namespace App\Http\Repositories;

use App\Http\Resources\BookDetailsCollection;
use App\Http\Resources\BookDetailsResource;
use App\Http\Resources\BookResource;
use App\Models\Book;

class BookRepository extends BaseRepository
{
    /**
     * Display the specified book detail.
     *
     * @param  int  $id
     * @return \App\Http\Resources\BookDetailsResource
     */
    public function getBookDetail($id)
    {
        try {
            $book = Book::getAllBookDetails()->selectFinalPrice()->find($id);
            return new BookDetailsResource($book);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Display a listing of the book apply sort and filter.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getBooksApplySortFilter($request)
    {
        try {
            $params = $request->all();
            $limit = $this->getLimit($request);
            $order = $this->getOrder($request);
            $perPage = $this->getPerPage($request);
            $books = Book::getAllBookDetails()
                ->selectFinalPrice()
                ->selectDiscountAmount()
                ->selectAverageRatingStar()
                ->selectNumberOfReviews()
                ->applySortFilter($params, $order)
                ->displayBooks($limit, $perPage);
            $books = new BookDetailsCollection($books);
            return response()->json([
                "resource" => $books->resource,
            ]);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
