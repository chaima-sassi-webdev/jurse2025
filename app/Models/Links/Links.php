<?php

namespace App\Models\Links;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Links extends Model
{
    use HasFactory;

    protected $fillable = ['href','title'];
    public $timestamps = true;
}
