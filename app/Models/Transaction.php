<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transactions';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $inrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'cash',
        'change',
        'total',
        'created_by',
        'created_at',
        'updated_at',
    ];

    public function transaction_details(): HasMany
    {
        return $this->hasMany(TransactionDetail::class, 'transaction_id', 'id');
    }
}
