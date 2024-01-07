<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    protected $fillable = ['name'];
    public $timestamps = true;

    public function links()
    {
        return $this->hasMany(Link::class, 'page_id');
    }
}
