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


    public function messages()
    {
        return $this->belongsToMany(
            Message::class,
            'user_messages',
            'message_id',
            'sender_id',
            'receiver_id'
        );
    }

}