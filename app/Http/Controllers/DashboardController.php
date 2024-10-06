<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionChartResource;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $startDate = Carbon::parse($request->start_date ?? now()->addDays(-30));
        $endDate = Carbon::parse($request->end_date ?? now());

        $transactions = Transaction::all(['created_at', 'total'])
            ->whereBetween('created_at', [$startDate, $endDate]);

        return Inertia::render('Dashboard', [
            'transactions' => TransactionChartResource::collection($transactions),
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => $endDate->format('Y-m-d'),
        ]);
    }
}
