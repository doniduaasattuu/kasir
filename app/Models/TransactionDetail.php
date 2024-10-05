<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransactionDetail extends Model
{
    use HasFactory;

    protected $table = 'transaction_details';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $inrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'transaction_id',
        'product_id',
        'quantity',
        'price',
    ];

    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class, 'transaction_id', 'id');
    }
}
