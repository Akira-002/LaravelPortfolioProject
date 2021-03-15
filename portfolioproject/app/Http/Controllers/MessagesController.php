<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\MessageUser;
use App\Models\User;

class MessagesController extends Controller
{
    public function index() {
        return Message::all();
    }

    // public function message() {
    //     $messages = Message::all();
    //     $data = [];
    //     foreach ($messages as $message) {
    //         $data[] = [
    //             // messages table
    //             'id' => $message->id,
    //             'description' => $message->description,
    //             // message_user table
    //             'message_user' => array_map(function ($id) {
    //                 return $id['id'];
    //             }, $message->message_user->toArray())
    //         ];
    //     }
    //     return $data;
    // }


    public function user() {
        $users = User::all();
        $data = [];
        foreach ($users as $user) {
            $data[] = [
                // users table
                'id' => $user->id,
                'name' => $user->name,
                // message_user table
                // 'message_id' => array_map(function ($message_id) {
                //     return $message_id['message_id'];
                // }, $user->sendmessage->toArray()),
                'send_messages' => array_map(function ($send_message) {
                    return $send_message['description'];
                }, $user->sendmessage->toArray())
            ];
        }
        return $data;
    }

    // public function show() {
    //     // $user = User::first();
    //     $user = User::find(1);
    //     return $user->messages();
    //     // foreach ($user->messages as $message) {
    //         // return $message->pivot->first();
    //     //     return $message->pivot->created_at;
    //     // }
    //     // return $user;
    //     // return $user->messages->first();
    //     // return $user->sendMessage();
    // // will return all messages for the user id 1
    // }


    // public function show(Message $message) {
    //     // $message = Message::all()->message->wherePivot('sender_id', 4);
    //     $message = Message::all();
    //     // return $message->wherePivot('sender_id', 4);
    //     // return $message->message_id;
    //     return $message;
    //     // return $user->sendMessage();
    // // will return all messages for the user id 1
    // }

    // public function show(User $user) {
    //     return view('message.show', compact('message'));
    // }

    // public function store(Request $request) {
    //     $this->validate($request, [
    //         // 'title' => 'required|unique:messages|max:100',
    //         'description' => 'required',
    //     ]);
    //     $message = Message::create($request->all());
    //     return response()->json($message, 201);
    // }

    public function update(Request $request, Message $message) {
        $message->update($request->all());
        return response()->json($message, 200);
    }

    public function delete(Message $message) {
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