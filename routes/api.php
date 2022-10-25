<?php

use App\Http\Controllers\BookAPIController;
use App\Http\Controllers\ReviewAPIController;
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

Route::resource('book', BookAPIController::class)->only([
    'show'
]);

Route::get('/books', [BookAPIController::class, 'showBooksApplySortFilter']);

Route::get('/reviews', [ReviewAPIController::class, 'showReviews']);
Route::get('/reviews/sortBy/date', [ReviewAPIController::class, 'showBookReviewsSortByDate']);
