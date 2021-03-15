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

    // public function users()
    // {
    //     return $this->belongsToMany(
    //         User::class,
    //         // 'messages',
    //         'message_user',
    //         // 'message_id',
    //         // 'sender_id',
    //         // 'receiver_id'
    //     )->withPivot('message_id', 'sender_id', 'receiver_id');
    //     // );
    // }

    // public function users()
    // {
    //     return $this->morphMany(MessageUser::class,'message_user');
    //     // ->using(MessageUser::class)
    //     // ->withPivot(['message_id', 'sender_id', 'receiver_id']);
    // }



    public function sender()
    {
        // return $this->morphMany(
        //     MessageUser::class,
        //     null,
        //     null,
        //     'sender_id',
        //     'id'
        // );

        return $this->morphMany(
            Messageable::class,
            null,
            // 'message_user',
            'sender_id',
            'receiver_id',
            'id',
            'id',
            false
        );
    }

    public function receiver()
    {
        return $this->morphMany(
            Messageable::class,
            null,
            null,
            'receiver_id',
            'id'
        );
    }
}
