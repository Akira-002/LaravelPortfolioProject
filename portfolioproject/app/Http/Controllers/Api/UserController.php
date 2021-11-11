<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Message;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(Request $request) {
        $keyword = $request->input('search_word');
        $auth_id = Auth::id();
        $users = User::where('id','!=', $auth_id)->select(['id','name'])->get();
        if(!empty($keyword)) {
            $query = User::query();
            $users = $query->where('name','like','%'.$keyword.'%')->get();
        }
        return response()->json($users);
    }

    public function showSendMessage() {
        $auth_id = Auth::id();
        $user = User::find($auth_id);
        $sendmessages = $user->sendmessage()->select(['id','description'])->get();
        if(!$sendmessages->first()) {
            return response()->json(['message' => 'Find a place for gratitude.'], 404);
        }
        return response()->json($sendmessages);
    }

    public function showReceivedMessage() {
        $auth_id = Auth::id();
        $user = User::find($auth_id);
        $receivedmessages = $user->receivedmessage()->select(['id', 'description'])->get();
        if(!$receivedmessages->first()) {
            return response()->json(['message' => 'Tell someone who has nowhere else to go to express their gratitude to you.'], 404);
        }
        return $receivedmessages;
    }

    public function showindex() {
        $auth_id = Auth::id();
        $user = User::find($auth_id);
        if($user) {
            return response()->json($user);
        }
        return response()->json(['message' => 'Who are you,  logged in?'], 404);
    }

    public function showuser(Request $request)
    {
        $user = User::where('id', $request->input('user_id'))->first();
        if($user) {
            return response()->json(['id' => $user->id, 'name' => $user->name]);
        }
        return response()->json(['message' => 'Beyond the Universe but I can not find!'], 404);
    }

    public function sentMessage(Request $request) {
        $auth_id = Auth::id();
        if(!$searchuser = User::where('id', $request->receiver_id)->first()) {
            return response()->json(['message' => 'Beyond the Universe but I can not find!'], 404);
        }
        if($auth_id == $request->receiver_id) {
            return response()->json(['message' => 'Does that mean the other you?'], 404);
        }
        $user = User::find($auth_id)->sendmessage();
        $sendmessage = $user->create([
            'description' => $request->description,
            'sender_id' => $auth_id,
            'receiver_id' => $request->receiver_id
        ]);
        return response()->json($sendmessage, 201);
    }

    public function editProfileName(Request $request) {
        $validator = Validator::make($request->all(), [
            'new_name' => 'required|string|max:255'
        ]);
        if ($validator->fails())
        {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $auth_id = Auth::id();
        $user = User::find($auth_id);
        if($user->name == $request->input('new_name')) {
            return response()->json(['message' => 'What do you want????'], 404);
        } else {
            $user->name = $request->input('new_name');
            $user->save();
            return response()->json($user, 201);
        }
        return response()->json(['message' => 'What??? Why!!!!!'], 404);
    }

    public function editProfileEmail(Request $request) {
        $validator = Validator::make($request->all(), [
            'new_email' => 'required|string|email|max:255|unique:users'
        ]);
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $auth_id = Auth::id();
        $user = User::find($auth_id);
        $user_check = User::where('email', $request->input('new_email'))->first();
        if($user_check) {
            return response()->json(['message' => "Already exist."], 404);
        }
         if($user->email == $request->input('new_email')) {
            return response()->json(['message' => 'What do you want????'], 404);
        } else {
            $user->email = $request->input('new_email');
            $user->save();
            return response()->json($user, 201);
        }
        return response()->json(['message' => 'What??? Why!!!!!'], 404);
    }
}
