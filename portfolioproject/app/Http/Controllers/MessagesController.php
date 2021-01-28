<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

class MessagesController extends Controller
{
    public function index() {
        return Message::all();
    }

    public function show(Message $message) {
        return $message;
    }

    public function store(Request $request) {
        $this->validate($request, [
            'title' => 'required|unique:messages|max:100',
            'description' => 'required',
        ]);
        $message = Message::create($request->all());
        return response()->json($message, 201);
    }

    public function update(Request $request, Message $message) {
        $message->update($request->all());
        return response()->json($message, 200);
    }

    public function delete(Message $message) {
        $message->delete();
        return response()->json(null, 204);
    }
}