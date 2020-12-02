<?php

use Illuminate\Support\Facades\Route;
use App\Http\Livewire\Simpleposts;

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
    return view('welcome');
});

Route::get('/form', "App\Http\Controllers\SampleFormController@show")->name("form.show");
Route::post('/form', "App\Http\Controllers\SampleFormController@post")->name("form.post");

Route::get('/form/confirm', "App\Http\Controllers\SampleFormController@confirm")->name("form.confirm");
Route::post('/form/confirm', "App\Http\Controllers\SampleFormController@send")->name("form.send");

Route::get('/form/thanks', "App\Http\Controllers\SampleFormController@complete")->name("form.complete");

// Route::get('/home', function () {
//     return view('home');
// });

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

// Route::get('/top', function () {
//     return view('top');
// });

// Route::get('/sub', function () {
//     return view('sub');
//     // ->middleware("key")でMiddlewareが有効になる
// })->middleware("simple_user_auth");

// Route::post('/login', 'App\Http\Controllers\SimpleUserLoginController@login');
// Route::post('/logout', 'App\Http\Controllers\SimpleUserLogoutController@logout');



Route::get('post', Simpleposts::class);