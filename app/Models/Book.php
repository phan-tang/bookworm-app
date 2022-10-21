<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'book';
    protected $append = ['discount_amount', 'final_price'];

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function discounts()
    {
        return $this->hasOne(Discount::class);
    }

    /**
     * Scope a query to show all books with detail.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAllBookDetails($query)
    {
        return $query
            ->leftJoin('review', 'book.id', '=', 'review.book_id')
            ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
            ->select('book.*', 'discount.discount_price', 'discount.discount_start_date', 'discount.discount_end_date')
            ->groupBy('book.id', 'discount.discount_price', 'discount.discount_start_date', 'discount.discount_end_date');
    }

    public function getFinalPrice()
    {
        $currentDate = Carbon::now()->format('Y-m-d');

        $this->final_price = $this->book_price;
        if ($this->discount_price != null and $this->discount_start_date <= $currentDate) {
            if ($this->discount_end_date == null or $currentDate <= $this->discount_end_date) {
                $this->final_price = $this->discount_price;
            }
        }

        return $this->final_price;
    }

    public function getDiscountAmount()
    {
        $currentDate = Carbon::now()->format('Y-m-d');

        $this->discount_amount = 0;
        if ($this->discount_price != null and $this->discount_start_date <= $currentDate) {
            if ($this->discount_end_date == null or $currentDate <= $this->discount_end_date) {
                $this->discount_amount = $this->book_price - $this->discount_price;
            }
        }

        return $this->discount_amount;
    }
}
