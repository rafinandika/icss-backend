<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluasi extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function submit()
    {
        return $this->hasMany(Submit::class);
    }
}
