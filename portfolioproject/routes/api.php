<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Message;


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::middleware('auth:api')->group(function() {
//     Route::get('user/{userId}/detail', 'App\Http\Controllers\UserController@show');
// });

Route::middleware('json.response')->group(function () {
    // public routes
    //->login - POST
    Route::post('/login', 'App\Http\Controllers\Api\AuthController@login')->name('login.api');
    //->register - POST
    Route::post('/register', 'App\Http\Controllers\Api\AuthController@register')->name('register.api');
});

// private routes
Route::middleware(['auth:api','json.response'])->group(function () {
  //->user - GET
  Route::get('/user','App\Http\Controllers\Api\UserController@show')->name('user.show');
  //->logout - GET
  Route::get('/logout', 'App\Http\Controllers\Api\AuthController@logout')->name('logout');
});


// // passport authentification
// Route::post('register', 'App\Http\Controllers\Auth\AuthController@register');
// Route::post('login', 'App\Http\Controllers\Auth\AuthController@login');


// get
Route::get('messages', 'App\Http\Controllers\MessagesController@index');
Route::get('messages/sendmessage', 'App\Http\Controllers\MessagesController@showSendMessage');
Route::get('messages/receivedmessage', 'App\Http\Controllers\MessagesController@showReceivedMessage');

// post
Route::post('messages/sentmeessage','App\Http\Controllers\MessagesController@sentMessage');

// delete
Route::delete('messages/deletemessage', 'App\Http\Controllers\MessagesController@deleteMessage');
