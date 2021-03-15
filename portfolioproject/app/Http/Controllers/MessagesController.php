<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\MessageUser;
use App\Models\User;

class MessagesController extends Controller
{
    public function index() {
        $messages = Message::all();
        $data = [];
        foreach($messages as $message) {
            $data[] = [
                'message' => $message->description,
                'sender' => $message->sender()->select('name')->get()->toArray(),
                'receiver' => $message->receiver()->select('name')->get()->toArray()
            ];
        }
        return $data;
    }

    public function showSendMessage() {
        $users = User::has('sendmessage')->get();
        $data = [];
        foreach($users as $user) {
            $data[] = [
                'name' => $user->name,
                'sendmessage' => $user->sendmessage()->select('id', 'description')->get()->toArray()
            ];
        }
        return $data;
    }

    public function showReceivedMessage() {
        $users = User::has('receivedmessage')->get();
        $data = [];
        foreach($users as $user) {
            $data[] = [
                'name' => $user->name,
                'receivedmessage' => $user->receivedmessage()->select('description')->get()->toArray()
            ];
        }
        return $data;
    }

    public function sentMessage(Request $request) {
        $this->validate($request, [
            'description' => 'required|unique:messages|max:100',
            'sender_id' => 'integer | between:0,15',
            'receiver_id' => 'integer | between:0,15'
        ]);

        $message = Message::create($request->all());
        return response()->json($message, 201);
    }

    // public function update(Request $request, Message $message) {
    //     $message->update($request->all());
    //     return response()->json($message, 200);
    // }

    public function deleteMessage(Request $request) {
        $this->validate($request, [
            'id' => 'integer',
            'receiver_id' => 'integer'
        ]);

        $message = Message::where('id', $request->id)->where('receiver_id', $request->receiver_id);
        $message->delete();
        return response()->json(null, 204);
    }

//     public function create(Request $request)
//     {
//         $message = new Message;
//         $message->description = 'Thanks for everything';

//         $message->save();

//         $user = User::find([1, 2]);
//         $message->users()->attach($user);

//         return 'Success';
//     }
}