<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Authors extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstname',
        'lastname',
        'organism',
        'country_id'
    ];
    public $timestamps = true;
    public function country()
    {
        return $this->belongsTo(Countries::class, 'country_id');
    }
     public function sessions()
    {
        return $this->belongsTo(Sessions::class, 'author_id');
    }
}
