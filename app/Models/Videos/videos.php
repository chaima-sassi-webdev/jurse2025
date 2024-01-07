<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class videos extends Model
{
    use HasFactory;
    protected $fillable = [
        'vpath',
        'order',
        'title'
     ];
     public $timestamps = true;
}
