<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['description'];

    public function users()
    {
        return $this->belongsToMany(
            User::class,
            'user_messages',
            'user_id',
            'message_id'
        );
    }
}
