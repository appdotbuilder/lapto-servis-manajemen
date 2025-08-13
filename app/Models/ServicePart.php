<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ServicePart
 *
 * @property int $id
 * @property int $service_id
 * @property int $product_id
 * @property int $quantity
 * @property float $unit_price
 * @property float $total_price
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Service $service
 * @property-read \App\Models\Product $product
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePart newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePart newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePart query()
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePart whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePart whereServiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePart whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePart whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePart whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePart whereTotalPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePart whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePart whereUpdatedAt($value)

 * 
 * @mixin \Eloquent
 */
class ServicePart extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'service_id',
        'product_id',
        'quantity',
        'unit_price',
        'total_price',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'integer',
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the service that owns this service part.
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Get the product for this service part.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get formatted total price in Indonesian Rupiah.
     */
    public function getFormattedTotalPriceAttribute(): string
    {
        return 'Rp ' . number_format($this->total_price, 0, ',', '.');
    }
}