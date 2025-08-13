<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $brands = ['ASUS', 'Acer', 'Lenovo', 'HP', 'Dell', 'Toshiba', 'MSI', 'Apple'];
        $models = ['VivoBook', 'IdeaPad', 'Pavilion', 'Inspiron', 'Satellite', 'ThinkPad', 'MacBook'];
        
        $complaints = [
            'Laptop tidak bisa menyala',
            'Layar laptop berkedip-kedip',
            'Keyboard tidak berfungsi beberapa tombol',
            'Baterai cepat habis',
            'Laptop sering hang dan restart sendiri',
            'Suara kipas berisik',
            'Port USB tidak berfungsi',
            'WiFi tidak bisa connect',
            'Layar laptop retak',
            'Charger tidak bisa mengisi',
            'Laptop overheat/panas berlebihan',
            'Hard drive rusak, data tidak bisa diakses',
            'RAM error, sering blue screen',
            'Webcam tidak berfungsi',
            'Audio tidak keluar dari speaker',
        ];

        $statuses = ['received', 'diagnosis', 'customer_approval', 'repair', 'testing', 'completed'];
        $status = fake()->randomElement($statuses);
        
        $serviceCost = fake()->numberBetween(50000, 500000);
        $partsCost = fake()->numberBetween(0, 2000000);
        $totalCost = $serviceCost + $partsCost;

        $createdAt = fake()->dateTimeBetween('-3 months', 'now');
        $receivedAt = $createdAt;
        $completedAt = $status === 'completed' ? fake()->dateTimeBetween($receivedAt, 'now') : null;

        return [
            'service_number' => 'SRV' . date('Ymd', $createdAt->getTimestamp()) . str_pad((string)fake()->unique()->numberBetween(1, 9999), 4, '0', STR_PAD_LEFT),
            'customer_id' => Customer::factory(),
            'technician_id' => fake()->optional(0.8)->randomElement(User::where('role', 'technician')->pluck('id')->toArray()) ?: null,
            'laptop_brand' => fake()->randomElement($brands),
            'laptop_model' => fake()->randomElement($models) . ' ' . fake()->randomElement(['A', 'X', 'Pro', 'Air']) . fake()->numberBetween(100, 999),
            'laptop_serial' => fake()->optional(0.8)->regexify('[A-Z0-9]{10,15}'),
            'initial_complaint' => fake()->randomElement($complaints),
            'diagnosis' => $status !== 'received' ? fake()->optional(0.9)->sentence() : null,
            'repair_notes' => in_array($status, ['repair', 'testing', 'completed']) ? fake()->optional(0.8)->sentence() : null,
            'service_cost' => $serviceCost,
            'parts_cost' => $partsCost,
            'total_cost' => $totalCost,
            'status' => $status,
            'customer_approved' => $status === 'customer_approval' ? false : fake()->boolean(80),
            'received_at' => $receivedAt,
            'completed_at' => $completedAt,
            'created_at' => $createdAt,
            'updated_at' => fake()->dateTimeBetween($createdAt, 'now'),
        ];
    }
}