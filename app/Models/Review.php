<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\ApplySortFilter;

class Review extends Model
{
    use HasFactory;
    use ApplySortFilter;

    public $timestamps = false;
    protected $table = 'review';

    protected $fields = [
        'sort',
        'star'
    ];

    /**
     * Scope a query to get list of books sorted by date.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param string $order
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function sortByDate($query, $order)
    {
        return $query->orderBy('review_date', $order);
    }

    /**
     * Scope a query to get list of book reviews filtered by rating start.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param string $field
     * @param int $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function filterBy($query, $field, $value)
    {
        return $query->where('rating_start', '=', $value);
    }
}
