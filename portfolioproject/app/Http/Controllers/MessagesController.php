<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\MessageUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    // public function sentMessageVaridator(array $data)
    // {
    //     return Validator::make($data, [
    //         'description' => ['required', 'unique:messages', 'max:255'],
    //         'sender_id' => ['required', 'integer', 'between:0,15'],
    //         'receiver_id' => ['required', 'integer', 'between:0,15'],
    //     ]);
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
}