<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // // A user can send a message
    // public function sendMessage()
    // {
    //     return $this->hasMany(Message::class, 'sender_id');
    // }

    // // A user can also receive a message
    // public function receivedMessage()
    // {
    //     return $this->hasMany(Message::class, 'receiver_id');
    // }


    // public function messages()
    // {
    //     return $this->belongsToMany(
    //         Message::class,
    //         'message_user',
    //         // 'messages',
    //         // 'message_id',
    //         // 'sender_id',
    //         // 'receiver_id'
    //     )->withPivot('message_id', 'sender_id', 'receiver_id');
    //     // );
    // }
    // public function messages()
    // {
    //     return $this->morphMany(MessageUser::class, 'message_user');
    //     // ->using(MessageUser::class)
    //     // ->withPivot(['message_id', 'sender_id', 'receiver_id']);
    // }

    public function sendmessage()
    {
        // return $this->morphMany(
        //     MessageUser::class,  // Model to join
        //     null,  // Prefix
        //     null,  // Distinguished Column as type
        //     'sender_id',  // Foreign Key
        //     'id'  //Locall Key
        // );

        return $this->morphToMany(
            Messageable::class,
            'messageable',
            'messageables',
            'messageable_id',
            'message_id',
            'id',
            'sender_id',
            false
        );
    }

    public function receivedmessage()
    {
        return $this->morphToMany(
            Messageable::class,
            'messageable',
            'messageables',
            'messageable_id',
            'message_id',
            'id',
            'receiver_id',
            false
        );
    }
}