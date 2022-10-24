<?php

namespace App\Http\Repositories;

use App\Models\Book;
use Illuminate\Http\Request;

class BookRepository
{
    public function getAllBookDetails($perPage)
    {
        try {
            $books = Book::allBookDetails()->paginate($perPage);
            return $books;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getAllBooks($perPage)
    {
        try {
            $books = Book::all()->paginate($perPage);
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

    public function getBooksSortedByOnSale($request)
    {
        try {
            $limit = $this->getLimit($request);
            $perPage = $this->getPerPage($request);
            $books = Book::getAllBookDetails()
                ->selectFinalPrice()
                ->selectDiscountAmount()
                ->orderBy('discount_amount', 'desc')
                ->orderBy('final_price', 'asc')
                ->displayBooks($limit, $perPage);
            return $books;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getBooksSortedByPrice($request)
    {
        try {
            $limit = $this->getLimit($request);
            $perPage = $this->getPerPage($request);
            $order = $this->getOrder($request);
            $books = Book::getAllBookDetails()
                ->selectFinalPrice()
                ->orderBy('final_price', $order)
                ->displayBooks($limit, $perPage);
            return $books;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getBooksSortedByRecommended($request)
    {
        try {
            $limit = $this->getLimit($request);
            $perPage = $this->getPerPage($request);
            $books = Book::getAllBookDetails()
                ->selectAverageRatingStar()
                ->selectFinalPrice()
                ->orderBy('average_rating_star', 'desc')
                ->orderBy('final_price', 'asc')
                ->displayBooks($limit, $perPage);
            return $books;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getBooksSortedByPopular($request)
    {
        try {
            $limit = $this->getLimit($request);
            $perPage = $this->getPerPage($request);
            $books = Book::getAllBookDetails()
                ->selectNumberOfReviews()
                ->selectFinalPrice()
                ->orderBy('number_of_reviews', 'desc')
                ->orderBy('final_price', 'asc')
                ->displayBooks($limit, $perPage);
            return $books;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getPerPage(Request $request)
    {
        if ($request->input('perPage')) {
            return $request->input('perPage');
        }
        return 15;
    }

    public function getLimit(Request $request)
    {
        if ($request->input('limit')) {
            return $request->input('limit');
        }
        return null;
    }

    public function getOrder(Request $request)
    {
        if ($request->input('order')) {
            return $request->input('order');
        }
        return 'asc';
    }
}
