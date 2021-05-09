<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function show(Request $request)
    {
        $auth_id = Auth::id();
        $user = User::find($auth_id);
        if($user) {
            return response()->json($user);
        }
        return response()->json(['message' => 'User not found!'], 404);
    }
}
