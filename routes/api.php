<?php

use App\Http\Controllers\BookAPIController;
use App\Http\Controllers\FilterAPIController;
use App\Http\Controllers\OrderAPIController;
use App\Http\Controllers\ReviewAPIController;
use App\Http\Controllers\UserAPIController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/logout', [UserAPIController::class, 'logout']);

    Route::post('/place_order', [OrderAPIController::class, 'store']);
});

Route::resource('book', BookAPIController::class)->only([
    'show'
]);

Route::get('/books', [BookAPIController::class, 'showBooksApplySortFilter']);
Route::get('/reviews', [ReviewAPIController::class, 'showReviews']);
Route::get('/filter_fields', [FilterAPIController::class, 'showFilterFields']);

Route::post('/create_review', [ReviewAPIController::class, 'store']);
Route::post('/login', [UserAPIController::class, 'login']);
