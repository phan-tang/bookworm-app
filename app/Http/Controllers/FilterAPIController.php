<?php

namespace App\Http\Controllers;

use App\Http\Repositories\FilterRepository;

class FilterAPIController extends Controller
{
    protected $filterRepository;

    public function __construct(FilterRepository $filterRepository)
    {
        $this->filterRepository = $filterRepository;
    }

    /**
     * Display a listing of filter fields.
     *
     * @return \Illuminate\Http\Response
     */
    public function showFilterFields()
    {
        return $this->filterRepository->getFilterFields();
    }
}
