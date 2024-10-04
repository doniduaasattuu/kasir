<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->role_id == 1;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $this->merge([
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return [
            'name' => ['required', 'unique:App\Models\Product,name'],
            'sku' => ['required', 'unique:App\Models\Product,sku', 'regex:/^[a-zA-Z]{3}[0-9]{3}[a-zA-Z]{2}$/'],
            'price' => ['required', 'numeric'],
            'stock' => ['required', 'numeric'],
            'created_at' => ['nullable'],
            'updated_at' => ['nullable'],
        ];
    }
}
