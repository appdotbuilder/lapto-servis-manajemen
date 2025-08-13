<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Product;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@servicelab.com',
            'role' => 'administrator',
            'is_active' => true,
        ]);

        // Create technician users
        $technicians = User::factory(3)->create([
            'role' => 'technician',
            'is_active' => true,
        ]);

        // Create sales users
        $salesUsers = User::factory(2)->create([
            'role' => 'sales',
            'is_active' => true,
        ]);

        // Create customers
        $customers = Customer::factory(50)->create();

        // Create products
        Product::factory(100)->create();

        // Create some low stock products for demonstration
        Product::factory(5)->create([
            'stock_quantity' => 2,
            'min_stock_level' => 10,
            'status' => 'active',
        ]);

        // Create services
        Service::factory(150)->create([
            'customer_id' => $customers->random()->id,
            'technician_id' => $technicians->random()->id,
        ]);

        // Create some recent services for dashboard
        Service::factory(10)->create([
            'customer_id' => $customers->random()->id,
            'technician_id' => $technicians->random()->id,
            'created_at' => now()->subDays(random_int(0, 7)),
            'updated_at' => now()->subDays(random_int(0, 7)),
        ]);
    }
}