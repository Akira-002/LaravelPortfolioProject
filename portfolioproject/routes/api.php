<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Message;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// get
Route::get('messages', 'App\Http\Controllers\MessagesController@index');

Route::get('messages/sendmessage', 'App\Http\Controllers\MessagesController@showSendMessage');

Route::get('messages/receivedmessage', 'App\Http\Controllers\MessagesController@showReceivedMessage');

// post
Route::post('messages/sentmeessage','App\Http\Controllers\MessagesController@sentMessage');

// delete
Route::delete('messages/deletemessage', 'App\Http\Controllers\MessagesController@deleteMessage');
