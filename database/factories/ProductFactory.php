<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['laptop_part', 'accessory', 'consumable', 'other'];
        $names = [
            'laptop_part' => [
                'RAM DDR4 8GB', 'SSD 256GB', 'Hard Drive 1TB', 'LCD Screen 14"', 'LCD Screen 15.6"',
                'Keyboard Laptop', 'Battery Laptop', 'Charger Laptop', 'WiFi Card', 'Cooling Fan'
            ],
            'accessory' => [
                'Mouse Wireless', 'Mouse Pad', 'USB Hub', 'HDMI Cable', 'VGA Cable',
                'Laptop Bag', 'Laptop Stand', 'Webcam HD', 'Bluetooth Speaker', 'Headphones'
            ],
            'consumable' => [
                'Thermal Paste', 'Cleaning Kit', 'Screen Cleaner', 'Compressed Air',
                'Alcohol Swab', 'Cable Ties', 'Screws Set', 'Adhesive Tape'
            ],
            'other' => [
                'External HDD 1TB', 'USB Flash Drive 32GB', 'Power Bank', 'Bluetooth Adapter',
                'Card Reader', 'Laptop Cooler', 'Privacy Screen', 'Docking Station'
            ]
        ];

        $category = fake()->randomElement($categories);
        $name = fake()->randomElement($names[$category]);
        $cost = fake()->numberBetween(10000, 2000000);
        $price = $cost * fake()->randomFloat(2, 1.3, 2.5); // 30-150% markup
        
        return [
            'code' => fake()->unique()->regexify('[A-Z]{2}[0-9]{4}'),
            'name' => $name,
            'description' => fake()->optional(0.7)->sentence(),
            'category' => $category,
            'price' => $price,
            'cost' => $cost,
            'stock_quantity' => fake()->numberBetween(0, 100),
            'min_stock_level' => fake()->numberBetween(5, 20),
            'status' => fake()->randomElement(['active', 'inactive']) === 'active' ? 'active' : 'inactive',
        ];
    }
}