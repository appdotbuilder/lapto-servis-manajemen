<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique()->comment('Product code/SKU');
            $table->string('name')->comment('Product name');
            $table->text('description')->nullable()->comment('Product description');
            $table->enum('category', ['laptop_part', 'accessory', 'consumable', 'other'])->comment('Product category');
            $table->decimal('price', 12, 2)->comment('Product selling price');
            $table->decimal('cost', 12, 2)->default(0)->comment('Product cost price');
            $table->integer('stock_quantity')->default(0)->comment('Current stock quantity');
            $table->integer('min_stock_level')->default(5)->comment('Minimum stock level for alerts');
            $table->enum('status', ['active', 'inactive'])->default('active')->comment('Product status');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('code');
            $table->index('name');
            $table->index('category');
            $table->index('status');
            $table->index(['status', 'stock_quantity']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};