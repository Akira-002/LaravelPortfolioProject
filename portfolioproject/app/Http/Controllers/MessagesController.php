<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\MessageUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessagesController extends Controller
{
    // public function index() {
    //     // $messages = Message::all();
    //     // $data = [];
    //     // foreach($messages as $message) {
    //     //     $data[] = [
    //     //         'message' => $message->description,
    //     //         'sender' => $message->sender()->select('name')->get()->toArray(),
    //     //         'receiver' => $message->receiver()->select('name')->get()->toArray()
    //     //     ];
    //     // }
    //     // return $data;
    //     $user = Auth::user();
    //     // $data  = [
    //     //     'name' => $user->name,
    //     //     'email' => $user->email
    //     // ];
    //     return $user;
    // }

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


    public function sentMessageVaridator(array $data)
    {
        return Validator::make($data, [
            'description' => ['required', 'unique:messages', 'max:255'],
            'sender_id' => ['required', 'integer', 'between:0,15'],
            'receiver_id' => ['required', 'integer', 'between:0,15'],
        ]);
    }

    public function sentMessage(array $data)
    {
        $user = Auth::user()->sendmessage();
        $sender_id = Auth::user()->id;
        $message = Message::create([
            'description' => $data['description'],
            'sender_id' => $sender_id,
            'receiver_id' => $data['receiver_id']
        ]);
        return response()->json($user->$message, 201);
    }

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