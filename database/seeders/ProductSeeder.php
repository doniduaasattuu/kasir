<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::factory()
            ->count(25)
            ->create();

        $products = [
            'Makaroni Original',
            'Keripik Pisang',
            'Keripik Tempe',
            'Cilok Pandawa',
            'Roasted Almond',
        ];

        Product::factory(5)
            ->count(5)
            ->sequence(fn(Sequence $sequence) => [
                'sku' => 'SKU00' . $sequence->index + 1 . 'OK',
                'name' => $products[$sequence->index],
                // 'price' => Faker::create()->numberBetween(10000, 20000),
                'price' => 10000,
                'stock' => Faker::create()->numberBetween(10, 100), // Stock between 10 and 100
                'created_at' => now(),
                'updated_at' => now(),
            ])
            ->create();
    }
}
