<?php

namespace App\Http\Repositories;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class OrderRepository extends BaseRepository
{
    /**
     * Store a newly created order in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function placeOrder($request)
    {
        try {
            $request->validate([
                'order_items' => 'array|required'
            ]);

            $user_id = $request->user()->id;

            $order_id = DB::table('order')->max('id');
            $order_id = $order_id == null ? 1 : $order_id;

            $order_amount = 0;
            foreach ($request->order_items as $key => $value) {
                $order_items[] = [
                    'order_id' => $order_id,
                    'book_id' => $value['id'],
                    'price' => $value['final_price'],
                    'quantity' => $value['quantity'],
                ];
                $order_amount += $value['quantity'] * $value['final_price'];
            }

            DB::transaction(function () use ($user_id, $order_amount, $order_items) {
                DB::table('order')->insert([
                    'user_id' => $user_id,
                    'order_date' => Carbon::now('Asia/Ho_Chi_Minh'),
                    'order_amount' => $order_amount
                ]);

                DB::table('order_item')->insert($order_items);
            });
            return response()->json('Ordered successfully', 201);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
