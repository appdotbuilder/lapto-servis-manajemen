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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('service_number')->unique()->comment('Service ticket number');
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->foreignId('technician_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('laptop_brand')->comment('Laptop brand');
            $table->string('laptop_model')->comment('Laptop model');
            $table->string('laptop_serial')->nullable()->comment('Laptop serial number');
            $table->text('initial_complaint')->comment('Customer complaint');
            $table->text('diagnosis')->nullable()->comment('Technician diagnosis');
            $table->text('repair_notes')->nullable()->comment('Repair notes');
            $table->decimal('service_cost', 12, 2)->default(0)->comment('Service cost');
            $table->decimal('parts_cost', 12, 2)->default(0)->comment('Parts cost');
            $table->decimal('total_cost', 12, 2)->default(0)->comment('Total cost');
            $table->enum('status', ['received', 'diagnosis', 'customer_approval', 'repair', 'testing', 'completed'])->default('received')->comment('Service status');
            $table->boolean('customer_approved')->default(false)->comment('Customer approval status');
            $table->timestamp('received_at')->nullable()->comment('Service received date');
            $table->timestamp('completed_at')->nullable()->comment('Service completed date');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('service_number');
            $table->index('customer_id');
            $table->index('technician_id');
            $table->index('status');
            $table->index(['status', 'created_at']);
            $table->index(['technician_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};