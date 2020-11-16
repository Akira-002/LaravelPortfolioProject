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
    return view('welcome');
});


// nameをつけることでredirect()できる
Route::get('/form', "App\Http\Controllers\SampleFormController@show")->name("form.show");
Route::post('/form', "App\Http\Controllers\SampleFormController@post")->name("form.post");

Route::get('/form/confirm', "App\Http\Controllers\SampleFormController@confirm")->name("form.confirm");
Route::post('/form/confirm', "App\Http\Controllers\SampleFormController@send")->name("form.send");

Route::get('/form/thanks', "App\Http\Controllers\SampleFormController@complete")->name("form.complete");

