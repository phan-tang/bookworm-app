<?php

namespace App\Http\Repositories;

use App\Models\Book;
use App\Http\Resources\BookDetailsCollection;

class BookRepository
{
    public function getAllBookDetails($limit)
    {
        try {
            $books = Book::allBookDetails()->paginate($limit);
            return $books;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getAllBooks($limit)
    {
        try {
            $books = Book::all()->paginate($limit);
            return $books;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getBookDetail($id)
    {
        try {
            $book = Book::allBookDetails()->find($id);
            return $book;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getBook($id)
    {
        try {
            $book = Book::find($id);
            return $book;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

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
            return $book;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

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
            return $book;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function deleteBook($id)
    {
        try {
            $book = Book::find($id);
            $book->delete();
            return $book;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getBooksSortedByOnSaleByCode($limit)
    {
        try {
            $books = new BookDetailsCollection(Book::allBookDetails()->paginate(20));
            $books = $books->sortByDesc(function ($item) {
                return $item->resource->getDiscountAmount();
            });
            return $books;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getBooksSortedByPriceByCode($lowToHigh, $limit)
    {
        try {
            $books = new BookDetailsCollection(Book::allBookDetails()->get());
            if ($lowToHigh === 'false') {
                $books = $books->sortByDesc(function ($item) {
                    return $item->resource->getFinalPrice();
                });
                return $books;
            }
            $books = $books->sortBy(function ($item) {
                return $item->resource->getFinalPrice();
            });
            return $books;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
