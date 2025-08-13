<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with key metrics.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get basic statistics
        $stats = [
            'total_services' => Service::count(),
            'pending_services' => Service::whereIn('status', ['received', 'diagnosis', 'customer_approval', 'repair', 'testing'])->count(),
            'completed_services' => Service::where('status', 'completed')->count(),
            'total_customers' => Customer::count(),
            'total_products' => Product::count(),
            'low_stock_products' => Product::lowStock()->count(),
            'total_sales' => Sale::sum('total_amount'),
            'monthly_revenue' => Sale::whereMonth('sale_date', now()->month)
                ->whereYear('sale_date', now()->year)
                ->sum('total_amount'),
        ];

        // Get recent services (limited based on user role)
        $recentServicesQuery = Service::with(['customer', 'technician'])
            ->latest()
            ->limit(5);
            
        if ($user->isTechnician()) {
            $recentServicesQuery->where('technician_id', $user->id);
        }
        
        $recentServices = $recentServicesQuery->get();

        // Get recent sales (for sales users and administrators)
        $recentSales = [];
        if ($user->isSales() || $user->isAdministrator()) {
            $recentSalesQuery = Sale::with(['customer', 'salesUser'])
                ->latest()
                ->limit(5);
                
            if ($user->isSales()) {
                $recentSalesQuery->where('sales_user_id', $user->id);
            }
            
            $recentSales = $recentSalesQuery->get();
        }

        // Get low stock alerts (for administrators)
        $lowStockProducts = [];
        if ($user->isAdministrator()) {
            $lowStockProducts = Product::lowStock()
                ->active()
                ->orderBy('stock_quantity')
                ->limit(5)
                ->get();
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentServices' => $recentServices,
            'recentSales' => $recentSales,
            'lowStockProducts' => $lowStockProducts,
            'user' => $user,
        ]);
    }
}