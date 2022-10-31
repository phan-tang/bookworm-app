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
            $stars = $this->getStars();
            return response()->json([
                'author' => $authors,
                'category' => $categories,
                'star' => $stars
            ]);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Get list of rating stars.
     *
     * @return object $stars
     */
    public function getStars()
    {
        $stars = array();
        for ($i = 1; $i <= 5; $i++) {
            $star = (object)["id" => $i, "star_name" => $i . " Star"];
            array_push($stars, $star);
        }
        return $stars;
    }
}
