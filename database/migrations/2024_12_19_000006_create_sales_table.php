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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique()->comment('Sales invoice number');
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->foreignId('sales_user_id')->constrained('users')->onDelete('cascade');
            $table->decimal('subtotal', 12, 2)->comment('Subtotal amount');
            $table->decimal('tax_amount', 12, 2)->default(0)->comment('Tax amount');
            $table->decimal('discount_amount', 12, 2)->default(0)->comment('Discount amount');
            $table->decimal('total_amount', 12, 2)->comment('Total amount');
            $table->enum('payment_status', ['pending', 'paid', 'cancelled'])->default('pending')->comment('Payment status');
            $table->timestamp('sale_date')->comment('Sale date');
            $table->text('notes')->nullable()->comment('Sale notes');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('invoice_number');
            $table->index('customer_id');
            $table->index('sales_user_id');
            $table->index('payment_status');
            $table->index(['payment_status', 'sale_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};