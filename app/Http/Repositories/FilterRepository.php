<?php

namespace App\Http\Repositories;

use App\Models\Category;
use App\Models\Author;


class FilterRepository extends BaseRepository
{
    /**
     * Display a listing of filter fields.
     *
     * @return \Illuminate\Http\Response
     */
    public function getFilterFields()
    {
        try {
            $authors = Author::orderBy('author_name')->get();
            $categories = Category::orderBy('category_name')->get();
            $stars = array(1, 2, 3, 4, 5);
            return response()->json([
                'authors' => $authors,
                'categories' => $categories,
                'stars' => $stars
            ]);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
