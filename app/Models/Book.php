<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\ApplySortFilter;

class Book extends Model
{
    use HasFactory;
    use ApplySortFilter;

    public $timestamps = false;
    protected $table = 'book';
    protected $append = ['discount_amount', 'final_price', 'average_rating_star', 'number_of_reviews'];

    protected $fields = [
        'sort',
        'author_id',
        'category_id',
        'star'
    ];

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
        return $this->hasMany(Discount::class);
    }

    /**
     * Scope a query to show all books.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeGetAllBookDetails($query)
    {
        return $query
            ->leftJoin('review', 'book.id', '=', 'review.book_id')
            ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
            ->select(
                'book.id',
                'book.category_id',
                'book.author_id',
                'book.book_title',
                'book.book_summary',
                'book.book_price',
                'book.book_cover_photo',
                'discount.discount_price',
                'discount.discount_start_date',
                'discount.discount_end_date'
            )
            ->groupBy('book.id', 'discount.discount_price', 'discount.discount_start_date', 'discount.discount_end_date');
    }

    /**
     * Scope a query to select discount amount of a book.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSelectDiscountAmount($query)
    {
        return $query
            ->selectRaw("(CASE 
                        WHEN discount.discount_price = NULL THEN 0
                        ELSE CASE
                            WHEN discount.discount_start_date > CURRENT_DATE THEN 0
                            ELSE CASE
                                WHEN discount.discount_end_date = NULL THEN book.book_price - discount.discount_price
                                ELSE CASE
                                    WHEN discount.discount_end_date >= CURRENT_DATE THEN book.book_price - discount.discount_price
                                    ELSE 0
                                    END
                                END
                            END
                        END) AS discount_amount");
    }

    /**
     * Scope a query to select final price of a book.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSelectFinalPrice($query)
    {
        return $query
            ->selectRaw("(CASE 
                        WHEN discount.discount_price = NULL THEN book.book_price
                        ELSE CASE
                            WHEN discount.discount_start_date > CURRENT_DATE THEN book.book_price
                            ELSE CASE
                                WHEN discount.discount_end_date = NULL THEN discount.discount_price
                                ELSE CASE
                                    WHEN discount.discount_end_date >= CURRENT_DATE THEN discount.discount_price
                                    ELSE book.book_price
                                    END
                                END
                            END
                        END) AS final_price");
    }

    /**
     * Scope a query to select average rating star of a book.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSelectAverageRatingStar($query)
    {
        return $query
            ->selectRaw("AVG(COALESCE(review.rating_start, 0)) AS average_rating_star");
    }

    /**
     * Scope a query to select number of reviews of a book.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSelectNumberOfReviews($query)
    {
        return $query
            ->selectRaw("COUNT(review.rating_start) AS number_of_reviews");
    }

    /**
     * Scope a query to display list of books.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeDisplayBooks($query, $limit, $perPage)
    {
        return $query->when($limit != null, function ($query) use ($limit) {
            return $query->limit($limit)->get();
        })
            ->when($limit == null, function ($query) use ($perPage) {
                return $query->paginate($perPage);
            });
    }

    /**
     * Scope a query to get list of books sorted by on sale.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function sortByOnSale($query)
    {
        return $query->orderBy('discount_amount', 'desc')
            ->orderBy('final_price', 'asc');
    }

    /**
     * Scope a query to get list of books sorted by recommended.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function sortByRecommended($query)
    {
        return $query->orderBy('average_rating_star', 'desc')
            ->orderBy('final_price', 'asc');
    }

    /**
     * Scope a query to get list of books sorted by popular.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function sortByPopular($query)
    {
        return $query->orderBy('number_of_reviews', 'desc')
            ->orderBy('final_price', 'asc');
    }

    /**
     * Scope a query to get list of books sorted by price.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param string $order
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function sortByPrice($query, $order)
    {
        return $query->orderBy('final_price', $order);
    }

    /**
     * Scope a query to get list of books filtered by input fields.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param string $field
     * @param int $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function filterBy($query, $field, $value)
    {
        if ($field == 'star') {
            return $query->havingRaw("AVG(COALESCE(review.rating_start, 0)) >= ?", [$value]);
        }
        return $query->where('book.' . $field, '=', $value);
    }
}
