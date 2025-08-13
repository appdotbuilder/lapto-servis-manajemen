import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <>
            <Head title="Selamat Datang - Manajemen Service Laptop" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl text-white">💻</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">ServiceLab Pro</h1>
                                    <p className="text-sm text-gray-500">Manajemen Service Laptop</p>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <Link href="/login">
                                    <Button variant="outline">Masuk</Button>
                                </Link>
                                <Link href="/register">
                                    <Button>Daftar</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <div className="mb-8">
                            <span className="text-6xl mb-4 block">💻🔧</span>
                        </div>
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            ServiceLab Pro
                        </h1>
                        <p className="text-2xl text-blue-600 font-semibold mb-4">
                            Sistem Manajemen Service Laptop Terpadu
                        </p>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Kelola layanan perbaikan laptop, inventori suku cadang, penjualan produk, 
                            dan laporan bisnis dalam satu platform yang powerful dan mudah digunakan.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link href="/login">
                                <Button size="lg" className="px-8 py-4 text-lg">
                                    🚀 Mulai Sekarang
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                                    📝 Daftar Gratis
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {/* Service Management */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="text-4xl mb-4">🔧</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Manajemen Service</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>✅ Tracking status service lengkap</li>
                                <li>✅ Assignment teknisi otomatis</li>
                                <li>✅ Cetak nota service & surat jalan</li>
                                <li>✅ Riwayat keluhan & perbaikan</li>
                            </ul>
                        </div>

                        {/* Inventory Management */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="text-4xl mb-4">📦</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Inventori & Stok</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>✅ Manajemen suku cadang laptop</li>
                                <li>✅ Alert stok rendah otomatis</li>
                                <li>✅ Tracking pembelian & supplier</li>
                                <li>✅ Laporan pergerakan stok</li>
                            </ul>
                        </div>

                        {/* Sales Management */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="text-4xl mb-4">💰</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Penjualan & Invoice</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>✅ Penjualan produk & aksesoris</li>
                                <li>✅ Generate invoice otomatis</li>
                                <li>✅ Surat jalan pengiriman</li>
                                <li>✅ Tracking pembayaran</li>
                            </ul>
                        </div>

                        {/* Reporting */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Laporan & Analitik</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>✅ Laporan service harian/bulanan</li>
                                <li>✅ Analisis pendapatan & profit</li>
                                <li>✅ Performa teknisi</li>
                                <li>✅ Trend keluhan pelanggan</li>
                            </ul>
                        </div>

                        {/* User Roles */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Multi Role User</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>✅ Administrator (akses penuh)</li>
                                <li>✅ Teknisi (service & perbaikan)</li>
                                <li>✅ Sales/Kasir (penjualan)</li>
                                <li>✅ Permission management</li>
                            </ul>
                        </div>

                        {/* Indonesian Features */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="text-4xl mb-4">🇮🇩</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Fitur Lokal Indonesia</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>✅ Interface bahasa Indonesia</li>
                                <li>✅ Format mata uang Rupiah</li>
                                <li>✅ Template nota/invoice lokal</li>
                                <li>✅ Workflow bisnis Indonesia</li>
                            </ul>
                        </div>
                    </div>

                    {/* Screenshots/Demo Section */}
                    <div className="bg-white rounded-2xl p-12 shadow-xl border border-gray-100 mb-16">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dashboard Overview</h2>
                            <p className="text-gray-600 text-lg">Pantau bisnis service laptop Anda dalam satu tampilan</p>
                        </div>
                        
                        {/* Mock Dashboard Preview */}
                        <div className="bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-200">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <div className="bg-blue-100 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">127</div>
                                    <div className="text-sm text-blue-700">Total Service</div>
                                </div>
                                <div className="bg-orange-100 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-orange-600">23</div>
                                    <div className="text-sm text-orange-700">Pending</div>
                                </div>
                                <div className="bg-green-100 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-green-600">Rp 45.2M</div>
                                    <div className="text-sm text-green-700">Revenue</div>
                                </div>
                                <div className="bg-purple-100 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-purple-600">5</div>
                                    <div className="text-sm text-purple-700">Stok Rendah</div>
                                </div>
                            </div>
                            <div className="text-center text-gray-500">
                                📊 Real-time analytics • 📈 Interactive charts • 🎯 Key performance indicators
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-4">Siap Mengelola Bisnis Service Laptop Anda?</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Bergabunglah dengan ratusan workshop yang sudah menggunakan ServiceLab Pro 
                            untuk meningkatkan efisiensi dan profitabilitas bisnis mereka.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link href="/register">
                                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                                    🚀 Mulai Gratis Sekarang
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-600">
                                    💻 Login Demo
                                </Button>
                            </Link>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-lg text-white">💻</span>
                            </div>
                            <span className="text-lg font-semibold text-gray-900">ServiceLab Pro</span>
                        </div>
                        <p className="text-gray-600">© 2024 ServiceLab Pro. Sistem Manajemen Service Laptop Terpadu.</p>
                        <p className="text-gray-500 text-sm mt-2">Made with ❤️ for Indonesian laptop service workshops</p>
                    </div>
                </footer>
            </div>
        </>
    );
}