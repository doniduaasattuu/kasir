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

        $cash = $request->cash;
        $change = $request->change;
        $products = collect($request->data)->map(function ($product) {
            return [
                Product::find($product['id']),
                $product['quantity'],
            ];
        });

        $transactionId = DB::table('transactions')->insertGetId([
            'created_by' => auth()->user()->id,
            'total' => 0,
            'cash' => $cash,
            'change' => $change,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $total = 0;
        foreach ($products as $data) {
            $product = $data[0];
            $quantity = $data[1];

            DB::table('transaction_details')->insert([
                'transaction_id' => $transactionId,
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $product->price,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $product->update(['stock' => (($product->stock) - $quantity)]);
            $total += ($product->price * $quantity);
        }

        DB::table('transactions')->where('id', $transactionId)->update(['total' => $total]);

        return redirect()
            ->route('transactions.index')
            ->with('success', 'Saved successfully');
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
