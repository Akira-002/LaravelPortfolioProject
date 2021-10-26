<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime'
    ];

    public function sendmessage()
    {
        return $this->hasMany(
            Message::class,
            'sender_id'
        );
    }

    public function receivedmessage()
    {
        return $this->hasMany(
            Message::class,
            'receiver_id'
        );
    }

    public function following_user()
    {
        return $this->hasMany(
            FollowRelation::class,
            'followed_user_id'
        );
    }
}
