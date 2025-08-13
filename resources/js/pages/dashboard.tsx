import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Stats {
    total_services: number;
    pending_services: number;
    completed_services: number;
    total_customers: number;
    total_products: number;
    low_stock_products: number;
    total_sales: number;
    monthly_revenue: number;
}

interface Service {
    id: number;
    service_number: string;
    status: string;
    laptop_brand: string;
    laptop_model: string;
    created_at: string;
    customer: {
        id: number;
        name: string;
        phone: string;
    };
    technician?: {
        id: number;
        name: string;
    };
}

interface Sale {
    id: number;
    invoice_number: string;
    total_amount: number;
    payment_status: string;
    sale_date: string;
    customer: {
        id: number;
        name: string;
    };
    sales_user: {
        id: number;
        name: string;
    };
}

interface Product {
    id: number;
    code: string;
    name: string;
    stock_quantity: number;
    min_stock_level: number;
}

interface User {
    id: number;
    name: string;
    role: 'administrator' | 'technician' | 'sales';
}

interface Props {
    stats: Stats;
    recentServices: Service[];
    recentSales: Sale[];
    lowStockProducts: Product[];
    user: User;
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentServices, recentSales, lowStockProducts, user }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        const colors = {
            'received': 'bg-blue-100 text-blue-800',
            'diagnosis': 'bg-yellow-100 text-yellow-800',
            'customer_approval': 'bg-orange-100 text-orange-800',
            'repair': 'bg-purple-100 text-purple-800',
            'testing': 'bg-indigo-100 text-indigo-800',
            'completed': 'bg-green-100 text-green-800',
            'pending': 'bg-yellow-100 text-yellow-800',
            'paid': 'bg-green-100 text-green-800',
            'cancelled': 'bg-red-100 text-red-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status: string) => {
        const texts = {
            'received': 'Diterima',
            'diagnosis': 'Diagnosis',
            'customer_approval': 'Menunggu Persetujuan',
            'repair': 'Perbaikan',
            'testing': 'Testing',
            'completed': 'Selesai',
            'pending': 'Menunggu',
            'paid': 'Lunas',
            'cancelled': 'Dibatalkan',
        };
        return texts[status as keyof typeof texts] || status;
    };

    return (
        <AppShell>
            <Head title="Dashboard - ServiceLab Pro" />
            
            <div className="space-y-6">
                {/* Welcome Header */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Selamat datang, {user.name}! 👋
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Berikut adalah ringkasan aktivitas hari ini
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl">💻</div>
                            <p className="text-sm text-gray-500 mt-1">
                                {user.role === 'administrator' && 'Administrator'}
                                {user.role === 'technician' && 'Teknisi'}
                                {user.role === 'sales' && 'Sales/Kasir'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">🔧</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Service</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total_services}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">⏳</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Service Berjalan</p>
                                <p className="text-2xl font-bold text-orange-600">{stats.pending_services}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">✅</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Service Selesai</p>
                                <p className="text-2xl font-bold text-green-600">{stats.completed_services}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">👥</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Pelanggan</p>
                                <p className="text-2xl font-bold text-blue-600">{stats.total_customers}</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional stats for administrators and sales */}
                    {(user.role === 'administrator' || user.role === 'sales') && (
                        <>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="text-3xl mr-4">💰</div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Pendapatan Bulan Ini</p>
                                        <p className="text-2xl font-bold text-green-600">
                                            {formatCurrency(stats.monthly_revenue)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="text-3xl mr-4">📦</div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Produk</p>
                                        <p className="text-2xl font-bold text-purple-600">{stats.total_products}</p>
                                    </div>
                                </div>
                            </div>

                            {user.role === 'administrator' && (
                                <div className="bg-white rounded-lg shadow p-6">
                                    <div className="flex items-center">
                                        <div className="text-3xl mr-4">⚠️</div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Stok Rendah</p>
                                            <p className="text-2xl font-bold text-red-600">{stats.low_stock_products}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Services */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">Service Terbaru</h3>
                                <Link href="/services">
                                    <Button variant="outline" size="sm">Lihat Semua</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {recentServices.length > 0 ? (
                                <div className="space-y-4">
                                    {recentServices.map((service) => (
                                        <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">{service.service_number}</p>
                                                <p className="text-sm text-gray-600">
                                                    {service.customer.name} - {service.laptop_brand} {service.laptop_model}
                                                </p>
                                                {service.technician && (
                                                    <p className="text-sm text-gray-500">
                                                        Teknisi: {service.technician.name}
                                                    </p>
                                                )}
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                                                {getStatusText(service.status)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">🔧</div>
                                    <p className="text-gray-500">Belum ada service terbaru</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Sales or Low Stock */}
                    {(user.role === 'administrator' || user.role === 'sales') ? (
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium text-gray-900">Penjualan Terbaru</h3>
                                    <Link href="/sales">
                                        <Button variant="outline" size="sm">Lihat Semua</Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6">
                                {recentSales.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentSales.map((sale) => (
                                            <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div>
                                                    <p className="font-medium text-gray-900">{sale.invoice_number}</p>
                                                    <p className="text-sm text-gray-600">{sale.customer.name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        Sales: {sale.sales_user.name}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-gray-900">
                                                        {formatCurrency(sale.total_amount)}
                                                    </p>
                                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sale.payment_status)}`}>
                                                        {getStatusText(sale.payment_status)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-2">💰</div>
                                        <p className="text-gray-500">Belum ada penjualan terbaru</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Service Saya</h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <p className="text-2xl font-bold text-blue-600">
                                            {recentServices.filter(s => s.status !== 'completed').length}
                                        </p>
                                        <p className="text-sm text-blue-700">Service Aktif</p>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <p className="text-2xl font-bold text-green-600">
                                            {recentServices.filter(s => s.status === 'completed').length}
                                        </p>
                                        <p className="text-sm text-green-700">Selesai Hari Ini</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Low Stock Alert for Administrators */}
                {user.role === 'administrator' && lowStockProducts.length > 0 && (
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                    <span className="text-2xl mr-2">⚠️</span>
                                    Peringatan Stok Rendah
                                </h3>
                                <Link href="/products">
                                    <Button variant="outline" size="sm">Kelola Stok</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="space-y-3">
                                {lowStockProducts.map((product) => (
                                    <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                                        <div>
                                            <p className="font-medium text-gray-900">{product.name}</p>
                                            <p className="text-sm text-gray-600">Kode: {product.code}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-red-600">
                                                Stok: {product.stock_quantity}
                                            </p>
                                            <p className="text-xs text-red-500">
                                                Min: {product.min_stock_level}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}