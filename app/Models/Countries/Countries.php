<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Countries extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
    ];
    public function Authors()
    {
        return $this->hasMany(Authors::class, 'country_id');
    }
}
