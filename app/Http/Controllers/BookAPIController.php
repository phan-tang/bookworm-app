<?php

namespace App\Http\Controllers;

use App\Http\Repositories\BookRepository;
use App\Http\Resources\BookDetailsCollection;
use App\Http\Resources\BookDetailsResource;
use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;
use Illuminate\Http\Request;

class BookAPIController extends Controller
{

    protected $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return new BookDetailsCollection($this->bookRepository->getAllBookDetails($this->getPerPage($request)));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showBooksByAdmin(Request $request)
    {
        return new BookCollection($this->bookRepository->getAllBooks($this->getPerPage($request)));
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
            'category_id' => 'required', 'author_id' => 'required',
            'book_title' => 'required', 'book_summary' => 'required',
            'book_price' => 'required'
        ]);
        return new BookResource($this->bookRepository->createBook($request));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new BookDetailsResource($this->bookRepository->getBookDetail($id));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showBookByAdmin($id)
    {
        return new BookResource($this->bookRepository->getBook($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateBookByAdmin(Request $request, $id)
    {
        $this->validate($request, [
            'category_id' => 'required', 'author_id' => 'required',
            'book_title' => 'required', 'book_summary' => 'required',
            'book_price' => 'required'
        ]);
        return new BookResource($this->bookRepository->updateBook($request, $id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroyBookByAdmin($id)
    {
        return new BookResource($this->bookRepository->deleteBook($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showBooksSortedByOnSale(Request $request)
    {
        return new BookDetailsCollection($this->bookRepository->getBooksSortedByOnSale($request));
    }

    public function showBooksSortedByPrice(Request $request)
    {
        return new BookDetailsCollection($this->bookRepository->getBooksSortedByPrice($request));
    }

    public function showBooksSortedByRecommended(Request $request)
    {
        return new BookDetailsCollection($this->bookRepository->getBooksSortedByRecommended($request));
    }

    public function showBooksSortedByPopular(Request $request)
    {
        return new BookDetailsCollection($this->bookRepository->getBooksSortedByPopular($request));
    }
}
