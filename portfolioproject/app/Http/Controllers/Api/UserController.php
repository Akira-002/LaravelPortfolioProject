<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Message;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        foreach($users as $user) {
            $data[] = [
                'name' => $user->name
            ];
        }
        return $data;
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

    public function sentMessage(Request $request)
    {
        $sender_id = Auth::id();
        if(!$searchuser = User::where('id', $request->receiver_id)->first()) {
            return response()->json(['message' => 'Beyond the Universe but I can not find!'], 404);
        }
        if($sender_id == $request->receiver_id) {
            return response()->json(['message' => 'Does that mean the other you?'], 404);
        }
        $user = User::find($sender_id)->sendmessage();
        $sendmessage = $user->create([
            'description' => $request->description,
            'sender_id' => $sender_id,
            'receiver_id' => $request->receiver_id
        ]);
        return response()->json($sendmessage, 201);
    }

}
