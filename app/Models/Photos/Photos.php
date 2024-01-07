<?php

namespace App\Models\Photos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photos extends Model
{
    use HasFactory;
     protected $fillable = [
        'src',
        'alt',
        'order'
     ];
     public $timestamps = true;
}
