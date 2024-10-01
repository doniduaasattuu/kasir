<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $table = 'roles';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $inrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'title',
        'created_at',
        'updated_at',
    ];
}
