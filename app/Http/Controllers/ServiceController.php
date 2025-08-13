<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Customer;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display a listing of the services.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        $query = Service::with(['customer', 'technician'])
            ->latest();

        // Filter by technician for technician users
        if ($user->isTechnician()) {
            $query->where('technician_id', $user->id);
        }

        // Apply filters
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('service_number', 'like', "%{$search}%")
                  ->orWhere('laptop_brand', 'like', "%{$search}%")
                  ->orWhere('laptop_model', 'like', "%{$search}%")
                  ->orWhereHas('customer', function($customerQuery) use ($search) {
                      $customerQuery->where('name', 'like', "%{$search}%")
                                  ->orWhere('phone', 'like', "%{$search}%");
                  });
            });
        }

        $services = $query->paginate(15)->withQueryString();

        return Inertia::render('services/index', [
            'services' => $services,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new service.
     */
    public function create()
    {
        $customers = Customer::orderBy('name')->get();
        $technicians = User::where('role', 'technician')
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('services/create', [
            'customers' => $customers,
            'technicians' => $technicians,
        ]);
    }

    /**
     * Store a newly created service in storage.
     */
    public function store(StoreServiceRequest $request)
    {
        $data = $request->validated();
        $data['service_number'] = Service::generateServiceNumber();
        $data['received_at'] = now();

        $service = Service::create($data);

        return redirect()->route('services.show', $service)
            ->with('success', 'Layanan berhasil dibuat.');
    }

    /**
     * Display the specified service.
     */
    public function show(Service $service)
    {
        $service->load(['customer', 'technician', 'serviceParts.product']);

        return Inertia::render('services/show', [
            'service' => $service,
        ]);
    }

    /**
     * Show the form for editing the specified service.
     */
    public function edit(Service $service)
    {
        $service->load(['customer', 'technician']);
        
        $customers = Customer::orderBy('name')->get();
        $technicians = User::where('role', 'technician')
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('services/edit', [
            'service' => $service,
            'customers' => $customers,
            'technicians' => $technicians,
        ]);
    }

    /**
     * Update the specified service in storage.
     */
    public function update(UpdateServiceRequest $request, Service $service)
    {
        $data = $request->validated();
        
        // Set completed date when status changes to completed
        if ($data['status'] === 'completed' && $service->status !== 'completed') {
            $data['completed_at'] = now();
        }

        $service->update($data);

        return redirect()->route('services.show', $service)
            ->with('success', 'Layanan berhasil diperbarui.');
    }

    /**
     * Remove the specified service from storage.
     */
    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->route('services.index')
            ->with('success', 'Layanan berhasil dihapus.');
    }
}