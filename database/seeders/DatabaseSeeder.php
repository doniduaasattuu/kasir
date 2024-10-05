<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('transaction_details')->delete();
        DB::table('transactions')->delete();
        DB::table('users')->delete();
        DB::table('products')->delete();

        $this->call([
            UserSeeder::class,
            ProductSeeder::class,
            TransactionSeeder::class,
        ]);
    }
}
