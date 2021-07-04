<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FollowRelation extends Model
{
    use HasFactory;

    protected $fillable = ['followed_user_id', 'following_user_id'];

    public function followed()
    {
        return $this->hasMany(
            User::class,
            'followed_user_id'
        );
    }

    public function following()
    {
        return $this->hasMany(
            User::class,
            'following_user_id'
        );
    }
}
