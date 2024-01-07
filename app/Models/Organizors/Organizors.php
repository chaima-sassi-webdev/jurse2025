<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organizors extends Model
{
    use HasFactory;


    protected $fillable = [
        'src',
        'alt',
        'order'
    ];
    public $timestamps = true;
}
