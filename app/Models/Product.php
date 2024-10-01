<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $inrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'name',
        'qr_code',
        'price',
        'stock',
        'created_at',
        'updated_at',
    ];
}
