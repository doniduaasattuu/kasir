<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = Transaction::orderBy('id', 'DESC')
            ->paginate(10);

        return Inertia::render('Transaction/Index', [
            'transactions' => TransactionResource::collection($transactions),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Transaction/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $products = collect($request->data)->map(function ($product) {
            return [
                Product::find($product['id']),
                $product['quantity'],
            ];
        });

        $transactionId = DB::table('transactions')->insertGetId([
            'created_by' => auth()->user()->id,
            'total' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        dd($products[0][0]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        $transaction->load('transaction_details');

        return Inertia::render('Transaction/Show', [
            'transaction' => TransactionResource::make($transaction),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
