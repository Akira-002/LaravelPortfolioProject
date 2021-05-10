<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function showindex()
    {
        $auth_id = Auth::id();
        $user = User::find($auth_id);
        if($user) {
            return response()->json($user);
        }
        return response()->json(['message' => 'Who are you,  logged in?'], 404);
    }

    public function showuser(Request $request)
    {
        $user = User::where('name', $request->name)->first();
        if($user) {
            return response()->json(['targetUserId' => $user->id, 'targetUserName' => $user->name]);
        }
        return response()->json(['message' => 'Beyond the Universe but I can not find!'], 404);
    }
}
