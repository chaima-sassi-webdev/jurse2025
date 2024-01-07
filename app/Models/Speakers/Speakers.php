<?php

namespace App\Models\Speakers;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Speakers extends Model
{
   use HasFactory;

    protected $fillable = ['firstName', 'lastname', 'website', 'description'];

    public $timestamps = true;
}
