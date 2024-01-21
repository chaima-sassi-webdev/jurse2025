<?php

namespace App\Models\Sponsors;



use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sponsors extends Model
{
    use HasFactory;
     protected $fillable = [
        'src',
        'alt',
        'order'
     ];
    public $timestamps = true;
}
