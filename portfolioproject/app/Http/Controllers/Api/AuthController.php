<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
// use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;



class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
        if ($validator->fails())
        {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        //Password Hash
        $request['password'] = \Hash::make($request['password']);

        //Create user from request
        $newUser = User::create($request->toArray());

        //create accessToken for newUser
        $token = $newUser->createToken('Laravel Password Grant Client')->accessToken;

        //return response with STATUS 200 and generated token
        $response = ['token' => $token, 'currentUser' => $newUser];

        return response($response, 200);
    }

    public function login(Request $request)
    {
        // $validator = Validator::make($request->all(), [
        //     'email' => 'required|email|exists:users,email',
        //     'password' => 'required'
        // ]);
        // if ($validator->fails())
        // {
        //     return response(['errors' => $validator->errors()->all()], 422);
        // }

        //Retrieve user with email in request
        $user = User::where('email', $request->email)->first();

        //If db query DID NOT return a result...
        if (!$user) {
            $response = ['error' => 'User does not exist'];
            return response($response, 422);
        }

        //else if User EXISTS
        //Check that passwordInRequest === passwordInDatabase
        if (\Hash::check($request->password, $user->password)) {
            //PASSWORD OK
            //Create a token for currentUser for this "session"
            // $token = $user->createToken('Laravel Password Grant Client')->accessToken;
            $token = $user->createToken($user->email.'-'.now())->accessToken;
            //and return it with the response
            $response = ['token' => $token, 'currentUser' => $user];
            return response($response, 200);
        } else {
            //response brings password error
            $response = ['error' => "Password missmatch"];
            return response($response, 422);
        }

        // if( Auth::attempt(['email'=>$request->email, 'password'=>$request->password]) ) {
        //     $user = Auth::user();
        //     $token = $user->createToken($user->email.'-'.now());
        //     return response()->json([
        //         'token' => $token->accessToken
        //     ]);
        // }
    }

    public function logout (Request $request) {
        //Revoke the token for the corresponding user
        $token = $request->user()->token();
        $token->revoke();
        //send response with 200 STATUS and logout feedback
        $response = ['success' => 'You have been succesfully logged out!'];
        return response($response, 200);
    }
}
