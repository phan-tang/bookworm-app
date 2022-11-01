<?php

namespace App\Http\Controllers;

use App\Http\Repositories\BookRepository;
use Illuminate\Http\Request;

class BookAPIController extends Controller
{

    protected $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    /**
     * Store a newly created book in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Http\Resources\BookResource
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'category_id' => 'required', 'author_id' => 'required',
            'book_title' => 'required', 'book_summary' => 'required',
            'book_price' => 'required'
        ]);
        return $this->bookRepository->createBook($request);
    }

    /**
     * Display the specified book detail.
     *
     * @param  int  $id
     * @return \App\Http\Resources\BookDetailsResource
     */
    public function show($id)
    {
        return $this->bookRepository->getBookDetail($id);
    }

    /**
     * Update the specified book in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \App\Http\Resources\BookResource
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'category_id' => 'required', 'author_id' => 'required',
            'book_title' => 'required', 'book_summary' => 'required',
            'book_price' => 'required'
        ]);
        return $this->bookRepository->updateBook($request, $id);
    }

    /**
     * Remove the specified book from storage.
     *
     * @param  int  $id
     * @return \App\Http\Resources\BookResource
     */
    public function destroy($id)
    {
        return $this->bookRepository->deleteBook($id);
    }

    /**
     * Display a listing of the book apply sort and filter.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function showBooksApplySortFilter(Request $request)
    {
        return $this->bookRepository->getBooksApplySortFilter($request);
    }
}
