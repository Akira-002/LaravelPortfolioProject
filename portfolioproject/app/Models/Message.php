<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['description'];

    // // A message belongs to a sender
    // public function sender()
    // {
    //     return $this->belongsTo(User::class, 'sender_id');
    // }

    // // A message also belongs to a receiver
    // public function receiver()
    // {
    //     return $this->belongsTo(User::class, 'receiver_id');
    // }

    public function users()
    {
        return $this->belongsToMany(
            User::class,
            'user_messages',
            'message_id',
            'sender_id',
            'receiver_id'
        );
    }
}
