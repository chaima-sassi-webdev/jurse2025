<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sessions extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'order',
        'title',
        'author_id'
    ];
    public $timestamps = true;
    public function authors()
    {
        return $this->hasMany(Authors::class, 'author_id');
    }
}
