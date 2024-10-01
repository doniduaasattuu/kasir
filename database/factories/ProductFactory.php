<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = fake();
        return [
            'name' => ucwords($faker->words(2, true)), // Generates a 2-word product name
            'sku' => strtoupper($faker->bothify('SKU###??')), // Random SKU
            'price' => $faker->numberBetween(10000, 1000000),
            'stock' => $faker->numberBetween(10, 100), // Stock between 10 and 100
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
