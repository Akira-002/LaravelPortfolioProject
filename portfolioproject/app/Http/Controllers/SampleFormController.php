<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Validator;

class SampleFormController extends Controller
{

    // formの表示
	private $formItems = ["name", "title", "body"];

	private $validator = [
		"name" => "required|string|max:100",
		"title" => "required|string|max:100",
		"body" => "required|string|max:100"
	];

	// show the form
	function show(){
		return view("form");
	}

	function post(Request $request){

		$input = $request->only($this->formItems);

        $validator = Validator::make($input, $this->validator);

		if($validator->fails()){
			return redirect()->action("App\Http\Controllers\SampleFormController@show")
				->withInput()
				->withErrors($validator);
		}

		// Writing to a session
		$request->session()->put("form_input", $input);

        // redirect to form/confirm
		return redirect()->action("App\Http\Controllers\SampleFormController@confirm");
    }

    // Show the confirmation screen
	function confirm(Request $request){
		// Retrieving Values from a Session
		$input = $request->session()->get("form_input");

		// If the session has no value, return to the form
		if(!$input){
			return redirect()->action("App\Http\Controllers\SampleFormController@show");
        }
		return view("form_confirm",["input" => $input]);
	}


	function send(Request $request){
		// Retrieving Values from a Session
		$input = $request->session()->get("form_input");

	    // When the back button is pressed
		if($request->has("back")){
			return redirect()->action("App\Http\Controllers\SampleFormController@show")
				->withInput($input);
		}

		// the session has no value, return to the form
		if(!$input){
			return redirect()->action("App\Http\Controllers\SampleFormController@show");
		}

		// Send an email here, etc.
		// Empty the session
		$request->session()->forget("form_input");
		return redirect()->action("App\Http\Controllers\SampleFormController@complete");
	}


    // Show the completion screen
    function complete(){
		return view("form_complete");
	}

}
