<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FavouriteWord extends Model
{
    protected $table = 'favourite_words';
    protected $guarded = [];
    public $timestamps = false;
}
