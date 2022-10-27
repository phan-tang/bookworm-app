<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Repositories\OrderRepository;

class OrderAPIController extends Controller
{
    protected $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    /**
     * Store a newly created order in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->orderRepository->placeOrder($request);
    }
}
