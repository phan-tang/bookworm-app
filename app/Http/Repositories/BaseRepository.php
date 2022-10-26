<?php

namespace App\Http\Repositories;

use Illuminate\Http\Request;

abstract class BaseRepository
{
    /**
     * Get number of books per page for a listing of book.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return int $perPage
     */
    public function getPerPage(Request $request)
    {
        if ($request->input('per_page')) {
            return $request->input('per_page');
        }
        return 15;
    }

    /**
     * Get limit for a listing of book.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return int or null $limit
     */
    public function getLimit(Request $request)
    {
        if ($request->input('limit')) {
            return $request->input('limit');
        }
        return null;
    }

    /**
     * Get sort order for a listing of book.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string $order
     */
    public function getOrder(Request $request)
    {
        if ($request->input('order')) {
            return $request->input('order');
        }
        return 'asc';
    }
}
