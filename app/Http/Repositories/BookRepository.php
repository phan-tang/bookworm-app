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
            $book = Book::getAllBookDetails()->find($id);
            return new BookDetailsResource($book);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Store a newly created book in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Http\Resources\BookResource
     */
    public function createBook($request)
    {
        try {
            $book = new Book();
            $book->category_id = $request->input('category_id');
            $book->author_id = $request->input('author_id');
            $book->book_title = $request->input('book_title');
            $book->book_summary = $request->input('book_summary');
            $book->book_price = $request->input('book_price');
            $book->book_cover_photo = $request->input('book_cover_photo');
            $book->save();
            return new BookResource($book);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Update the specified book in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \App\Http\Resources\BookResource
     */
    public function updateBook($request, $id)
    {
        try {
            $book = Book::find($id);
            $book->category_id = $request->input('category_id');
            $book->author_id = $request->input('author_id');
            $book->book_title = $request->input('book_title');
            $book->book_summary = $request->input('book_summary');
            $book->book_price = $request->input('book_price');
            $book->book_cover_photo = $request->input('book_cover_photo');
            $book->save();
            return new BookResource($book);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Remove the specified book from storage.
     *
     * @param  int  $id
     * @return \App\Http\Resources\BookResource
     */
    public function deleteBook($id)
    {
        try {
            $book = Book::find($id);
            $book->delete();
            return  new BookResource($book);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Display a listing of the book apply sort and filter.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Http\Resources\BookDetailsCollection
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
            return new BookDetailsCollection($books);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
