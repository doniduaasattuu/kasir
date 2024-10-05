<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Transaction::factory()
        //     ->count(50)
        //     ->create();

        $faker = Faker::create();

        foreach (range(1, 50) as $index) {
            $transactionId = DB::table('transactions')->insertGetId([
                'created_by' => User::all()->random()->id,
                'total' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Generate transaction details for each transaction
            $total = 0;
            foreach (range(1, $faker->numberBetween(1, 5)) as $detailIndex) {
                $productId = $faker->numberBetween(1, 100); // Assuming 100 products in your DB
                $quantity = $faker->numberBetween(1, 5);
                $productPrice = DB::table('products')->where('id', $productId)->value('price'); // Get product price

                DB::table('transaction_details')->insert([
                    'transaction_id' => $transactionId,
                    'product_id' => $productId,
                    'quantity' => $quantity,
                    'price' => $productPrice,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                // Update the total price for this transaction
                $total += $productPrice * $quantity;
            }

            // Update the transaction total
            DB::table('transactions')->where('id', $transactionId)->update(['total' => $total]);
        }
    }
}
