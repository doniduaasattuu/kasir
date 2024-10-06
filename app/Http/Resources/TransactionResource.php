<?php

namespace App\Http\Resources;

use App\Models\User;
use Database\Factories\TransactionDetailFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'cash' => $this->cash,
            'change' => $this->change,
            'total' => $this->total,
            'created_by' => User::find($this->created_by)?->name,
            'created_at' => $this->created_at->toFormattedDateString(),
            'updated_at' => $this->updated_at->toFormattedDateString(),
            'transaction_details' => TransactionDetailResource::collection($this->whenLoaded('transaction_details'))
        ];
    }
}
