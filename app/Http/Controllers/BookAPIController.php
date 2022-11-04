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
