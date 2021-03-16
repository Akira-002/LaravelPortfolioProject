<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Message;


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::middleware('auth:api')->group(function() {
    Route::get('user/{userId}/detail', 'App\Http\Controllers\UserController@show');
});


// passport authentification
Route::post('register', 'App\Http\Controllers\AuthController@register');
Route::post('login', 'App\Http\Controllers\AuthController@login');


// get
Route::get('messages', 'App\Http\Controllers\MessagesController@index');
Route::get('messages/sendmessage', 'App\Http\Controllers\MessagesController@showSendMessage');
Route::get('messages/receivedmessage', 'App\Http\Controllers\MessagesController@showReceivedMessage');

// post
Route::post('messages/sentmeessage','App\Http\Controllers\MessagesController@sentMessage');

// delete
Route::delete('messages/deletemessage', 'App\Http\Controllers\MessagesController@deleteMessage');
