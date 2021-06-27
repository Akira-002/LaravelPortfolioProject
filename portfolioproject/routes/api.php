<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Message;


Route::middleware('json.response')->group(function () {
    // public routes
    //->login - POST
    Route::post('/login', 'App\Http\Controllers\Api\AuthController@login')->name('login.api');
    //->register - POST
    Route::post('/register', 'App\Http\Controllers\Api\AuthController@register')->name('register.api');
});

// private routes
Route::middleware(['auth:api','json.response'])->group(function () {
  //->user - exhibit all user
  Route::get('/index', 'App\Http\Controllers\Api\UserController@index');
  //->user - exhibit me
  Route::get('/me', 'App\Http\Controllers\Api\UserController@showindex');
  //->user - exhibit others
  Route::post('/other', 'App\Http\Controllers\Api\UserController@showuser');
  //->user - exhibit all send message
  Route::get('/sendmessages', 'App\Http\Controllers\Api\UserController@showSendMessage');
  //->user - exhibit all received message
  Route::get('/receivedmessages', 'App\Http\Controllers\Api\UserController@showReceivedMessage');
  //->user - sentMessage
  Route::post('/sentmessage', 'App\Http\Controllers\Api\UserController@sentMessage');
  //->logout - GET
  Route::get('/logout', 'App\Http\Controllers\Api\AuthController@logout');
});


// get  --For checking during development
Route::get('messages', 'App\Http\Controllers\MessagesController@index');
// Route::get('messages/receivedmessage', 'App\Http\Controllers\MessagesController@showReceivedMessage');

// post  --For checking during development
Route::post('messages/sentmessage','App\Http\Controllers\MessagesController@sentMessage');

// delete  --For checking during development
Route::delete('messages/deletemessage', 'App\Http\Controllers\MessagesController@deleteMessage');
