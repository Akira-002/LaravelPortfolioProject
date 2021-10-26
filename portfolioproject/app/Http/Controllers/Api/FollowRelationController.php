<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\FollowRelation;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowRelationController extends Controller
{
    public function followingUser(Request $request)
    {
        $auth_id = Auth::id();
        if($auth_id == $request->following_user_id) {
            return response()->json(['message' => 'Does that mean the other you?'], 404);
        }

        $following_users = FollowRelation::where('followed_user_id', $auth_id)->get();
        $following_status = $following_users->where('following_user_id', $request->following_user_id)->first();
        if(!empty($following_status)) {
            return response()->json(['message' => "You've already sent in your application, so let's wait a little longer..."], 404);
        }
        if(!$searchuser = User::where('id', $request->following_user_id)->first()) {
            return response()->json(['message' => 'Beyond the Universe but I can not find!'], 404);
        }
        $following = User::find($auth_id)->following_user();
        $send_appliciation = $following->create([
            'followed_user_id' => $auth_id,
            'following_user_id' => $request->following_user_id
        ]);
        return response()->json($send_appliciation, 201);
    }

    public function showFollow(Request $request)
    {
        // Extraction of users in a follow relationship
        $auth_id = Auth::id();
        $following_user = FollowRelation::where('following_user_id', $auth_id)->select(['followed_user_id'])->get();
        $followed_user = FollowRelation::where('followed_user_id', $auth_id)->select(['following_user_id'])->get();

        // Convert extracted users to an array
        $following_user_obj = json_decode(json_encode($following_user), true);
        $followed_user_obj = json_decode(json_encode($followed_user), true);

        // Create a new array with user_id from the array
        $following_user_id = array_column($following_user_obj, 'followed_user_id');
        $followed_user_id = array_column($followed_user_obj, 'following_user_id');

        // Extraction of common id and reassign keys
        $mutually_follow_users = array_merge(array_intersect($following_user_id, $followed_user_id));

        $follow_relation_users = [];
        foreach($mutually_follow_users as $mutually_follow_user) {
            array_push($follow_relation_users, User::where('id', $mutually_follow_user)->select(['id', 'name'])->get());
        }

        return response()->json($follow_relation_users);
    }
}
