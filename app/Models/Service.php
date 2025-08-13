<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Service
 *
 * @property int $id
 * @property string $service_number
 * @property int $customer_id
 * @property int|null $technician_id
 * @property string $laptop_brand
 * @property string $laptop_model
 * @property string|null $laptop_serial
 * @property string $initial_complaint
 * @property string|null $diagnosis
 * @property string|null $repair_notes
 * @property float $service_cost
 * @property float $parts_cost
 * @property float $total_cost
 * @property string $status
 * @property bool $customer_approved
 * @property \Illuminate\Support\Carbon|null $received_at
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Customer $customer
 * @property-read \App\Models\User|null $technician
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ServicePart> $serviceParts
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Service newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Service newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Service query()
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereServiceNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereTechnicianId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereLaptopBrand($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereLaptopModel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereLaptopSerial($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereInitialComplaint($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereDiagnosis($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereRepairNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereServiceCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service wherePartsCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereTotalCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereCustomerApproved($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereReceivedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service byStatus($status)
 * @method static \Database\Factories\ServiceFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Service extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'service_number',
        'customer_id',
        'technician_id',
        'laptop_brand',
        'laptop_model',
        'laptop_serial',
        'initial_complaint',
        'diagnosis',
        'repair_notes',
        'service_cost',
        'parts_cost',
        'total_cost',
        'status',
        'customer_approved',
        'received_at',
        'completed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'service_cost' => 'decimal:2',
        'parts_cost' => 'decimal:2',
        'total_cost' => 'decimal:2',
        'customer_approved' => 'boolean',
        'received_at' => 'datetime',
        'completed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the customer that owns the service.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the technician assigned to this service.
     */
    public function technician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'technician_id');
    }

    /**
     * Get service parts used in this service.
     */
    public function serviceParts(): HasMany
    {
        return $this->hasMany(ServicePart::class);
    }

    /**
     * Scope a query to filter by status.
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Generate next service number.
     */
    public static function generateServiceNumber(): string
    {
        $latest = static::latest('id')->first();
        $number = $latest ? $latest->id + 1 : 1;
        return 'SRV' . date('Ymd') . str_pad((string)$number, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Get formatted total cost in Indonesian Rupiah.
     */
    public function getFormattedTotalCostAttribute(): string
    {
        return 'Rp ' . number_format($this->total_cost, 0, ',', '.');
    }

    /**
     * Get status in Indonesian.
     */
    public function getStatusIndonesianAttribute(): string
    {
        $statuses = [
            'received' => 'Diterima',
            'diagnosis' => 'Diagnosis',
            'customer_approval' => 'Menunggu Persetujuan',
            'repair' => 'Perbaikan',
            'testing' => 'Testing',
            'completed' => 'Selesai',
        ];

        return $statuses[$this->status] ?? $this->status;
    }
}