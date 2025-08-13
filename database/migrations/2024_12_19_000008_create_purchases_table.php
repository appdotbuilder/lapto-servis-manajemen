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
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->string('purchase_number')->unique()->comment('Purchase order number');
            $table->string('supplier_name')->comment('Supplier name');
            $table->decimal('total_amount', 12, 2)->comment('Total purchase amount');
            $table->timestamp('purchase_date')->comment('Purchase date');
            $table->text('notes')->nullable()->comment('Purchase notes');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('purchase_number');
            $table->index('purchase_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};