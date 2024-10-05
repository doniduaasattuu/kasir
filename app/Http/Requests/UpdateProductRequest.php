<?php

namespace App\Http\Requests;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $product = Product::find(class_basename($this->url()));

        $this->merge([
            'updated_at' => now(),
        ]);

        return [
            'name' => ['required', Rule::unique(Product::class)->ignore($product->id)],
            'sku' => ['required', Rule::unique(Product::class)->ignore($product->id), 'regex:/^[a-zA-Z]{3}[0-9]{3}[a-zA-Z]{2}$/'],
            'price' => ['required', 'numeric'],
            'stock' => ['required', 'numeric'],
            'updated_at' => ['nullable'],
        ];
    }
}
