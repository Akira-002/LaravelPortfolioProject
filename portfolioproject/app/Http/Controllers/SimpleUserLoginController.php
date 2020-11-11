<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

class SimpleUserLoginController extends Controller
{
    function login(Request $request){
        // Checking the information, have entered.
        // Use $request->input("xxx") to receive the input values of name="user_id" and name="password".
        // -> this idea is very important!!!
		$user_id = $request->input("user_id");
		$password = $request->input("password");

		// pass login
		if($user_id == "hogehoge" && $password == "fugafuga"){
            session()->put("simple_user_auth", true);
			return redirect("/sub");
		}

		// false login
		return redirect("/top")->withErrors([
			"login" => "Incorrect ID or Pass lol"
		]);
	}
}
