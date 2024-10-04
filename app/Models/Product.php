<?php

namespace App\Models;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

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
        'sku',
        'price',
        'stock',
        'created_at',
        'updated_at',
    ];

    public function scopeSearch(Builder $builder, Request $request)
    {
        $search = $request->search;

        $builder
            ->when($search, function ($query, $search) {
                $query
                    ->where('id', 'LIKE', "%$search%")
                    ->orWhere('name', 'LIKE', "%$search%")
                    ->orWhere('sku', 'LIKE', "%$search%")
                    ->orWhere('price', 'LIKE', "%$search%")
                    ->orWhere('stock', 'LIKE', "%$search%");
            });
    }
}
