<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Message;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('messages', 'App\Http\Controllers\MessagesController@index');

Route::get('messages/{message}', 'App\Http\Controllers\MessagesController@show');

Route::post('messages','App\Http\Controllers\MessagesController@store');

Route::put('messages/{message}','App\Http\Controllers\MessagesController@update');

Route::delete('messages/{message}', 'App\Http\Controllers\MessagesController@delete');
