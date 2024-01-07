<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;

    protected $fillable = ['href', 'page_id'];
    public $timestamps = true;

    public function page()
    {
        return $this->belongsTo(Page::class, 'page_id');
    }
}
