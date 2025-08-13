<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Purchase
 *
 * @property int $id
 * @property string $purchase_number
 * @property string $supplier_name
 * @property float $total_amount
 * @property \Illuminate\Support\Carbon $purchase_date
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PurchaseItem> $purchaseItems
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase query()
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase wherePurchaseNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereSupplierName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereTotalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase wherePurchaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereUpdatedAt($value)

 * 
 * @mixin \Eloquent
 */
class Purchase extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'purchase_number',
        'supplier_name',
        'total_amount',
        'purchase_date',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'total_amount' => 'decimal:2',
        'purchase_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get purchase items for this purchase.
     */
    public function purchaseItems(): HasMany
    {
        return $this->hasMany(PurchaseItem::class);
    }

    /**
     * Generate next purchase number.
     */
    public static function generatePurchaseNumber(): string
    {
        $latest = static::latest('id')->first();
        $number = $latest ? $latest->id + 1 : 1;
        return 'PO' . date('Ymd') . str_pad((string)$number, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Get formatted total amount in Indonesian Rupiah.
     */
    public function getFormattedTotalAmountAttribute(): string
    {
        return 'Rp ' . number_format($this->total_amount, 0, ',', '.');
    }
}