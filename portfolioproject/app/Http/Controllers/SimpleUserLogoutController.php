<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

class SimpleUserLogoutController extends Controller
{
	function logout(){
		session()->forget("simple_user_auth");
		return redirect("/");
	}
}
