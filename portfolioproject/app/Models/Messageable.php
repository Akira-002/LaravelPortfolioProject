<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Relations\Pivot;

class Messageable extends Model
{

    protected $primaryKey = 'message_id';

    public $timestamps = false;

    public function messageables()
    {
        return $this->morphTo();
    }
}
