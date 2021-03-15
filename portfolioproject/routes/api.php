<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Message;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('messages', 'App\Http\Controllers\MessagesController@index');

// Route::get('messages/{message}', 'App\Http\Controllers\MessagesController@show');

// Route::get('messages/message_users', 'App\Http\Controllers\MessagesController@message');
Route::get('messages/message_users', 'App\Http\Controllers\MessagesController@user');

// Route::post('messages','App\Http\Controllers\MessagesController@store');

// Route::post('messages','App\Http\Controllers\MessagesController@create');

Route::put('messages/{message}','App\Http\Controllers\MessagesController@update');

Route::delete('messages/{message}', 'App\Http\Controllers\MessagesController@delete');
