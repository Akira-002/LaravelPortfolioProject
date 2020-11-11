<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});

Route::get('/top', function () {
    return view('top');
});

Route::get('/sub', function () {
    return view('sub');
    // ->middleware("key")でMiddlewareが有効になる
})->middleware("simple_user_auth");

Route::post('/login', 'App\Http\Controllers\SimpleUserLoginController@login');