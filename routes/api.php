<?php

use App\Http\Controllers\Api\NameColorController;
use App\Http\Controllers\Api\WordController;
use App\Http\Controllers\FavouriteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('name-colors', NameColorController::class);
Route::apiResource('words', WordController::class);
Route::post('favouriteSave', [FavouriteController::class, 'storeFav']);
Route::get('favourite', [FavouriteController::class, 'getFav']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
