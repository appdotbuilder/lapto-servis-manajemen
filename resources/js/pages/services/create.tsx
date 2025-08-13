import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Customer {
    id: number;
    name: string;
    phone: string;
}

interface Technician {
    id: number;
    name: string;
}



interface Props {
    customers: Customer[];
    technicians: Technician[];
    [key: string]: unknown;
}

export default function CreateService({ customers, technicians }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        customer_id: '',
        technician_id: '',
        laptop_brand: '',
        laptop_model: '',
        laptop_serial: '',
        initial_complaint: '',
        diagnosis: '',
        repair_notes: '',
        service_cost: '',
        parts_cost: '',
        total_cost: '',
        status: 'received',
        customer_approved: 0 as number,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/services');
    };



    React.useEffect(() => {
        const serviceCost = parseFloat(data.service_cost) || 0;
        const partsCost = parseFloat(data.parts_cost) || 0;
        const total = serviceCost + partsCost;
        setData('total_cost', total.toString());
    }, [data.service_cost, data.parts_cost, setData]);

    return (
        <AppShell>
            <Head title="Service Baru - ServiceLab Pro" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Service Baru</h1>
                        <p className="text-gray-600">Tambah service laptop baru</p>
                    </div>
                    <Link href="/services">
                        <Button variant="outline">
                            ← Kembali
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Customer Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                    🧑‍💼 Informasi Pelanggan
                                </h3>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Pelanggan *
                                    </label>
                                    <select
                                        value={data.customer_id}
                                        onChange={(e) => setData('customer_id', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Pilih Pelanggan</option>
                                        {customers.map((customer) => (
                                            <option key={customer.id} value={customer.id}>
                                                {customer.name} - {customer.phone}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.customer_id && (
                                        <p className="text-red-500 text-sm mt-1">{errors.customer_id}</p>
                                    )}
                                </div>
                            </div>

                            {/* Laptop Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                    💻 Informasi Laptop
                                </h3>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Merk Laptop *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.laptop_brand}
                                        onChange={(e) => setData('laptop_brand', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Contoh: ASUS, Acer, Lenovo"
                                        required
                                    />
                                    {errors.laptop_brand && (
                                        <p className="text-red-500 text-sm mt-1">{errors.laptop_brand}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Model Laptop *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.laptop_model}
                                        onChange={(e) => setData('laptop_model', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Contoh: VivoBook A14, IdeaPad 3"
                                        required
                                    />
                                    {errors.laptop_model && (
                                        <p className="text-red-500 text-sm mt-1">{errors.laptop_model}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Serial Number
                                    </label>
                                    <input
                                        type="text"
                                        value={data.laptop_serial}
                                        onChange={(e) => setData('laptop_serial', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Serial number laptop (opsional)"
                                    />
                                    {errors.laptop_serial && (
                                        <p className="text-red-500 text-sm mt-1">{errors.laptop_serial}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Complaint */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
                                🔧 Detail Service
                            </h3>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Keluhan Awal *
                                    </label>
                                    <textarea
                                        value={data.initial_complaint}
                                        onChange={(e) => setData('initial_complaint', e.target.value)}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Jelaskan masalah yang dialami pelanggan..."
                                        required
                                    />
                                    {errors.initial_complaint && (
                                        <p className="text-red-500 text-sm mt-1">{errors.initial_complaint}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Teknisi
                                    </label>
                                    <select
                                        value={data.technician_id}
                                        onChange={(e) => setData('technician_id', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Pilih Teknisi</option>
                                        {technicians.map((technician) => (
                                            <option key={technician.id} value={technician.id}>
                                                {technician.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.technician_id && (
                                        <p className="text-red-500 text-sm mt-1">{errors.technician_id}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Advanced Fields */}
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                📋 Detail Lanjutan (Opsional)
                            </h3>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Diagnosis
                                        </label>
                                        <textarea
                                            value={data.diagnosis}
                                            onChange={(e) => setData('diagnosis', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Hasil diagnosis teknisi..."
                                        />
                                        {errors.diagnosis && (
                                            <p className="text-red-500 text-sm mt-1">{errors.diagnosis}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Status Service
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="received">Diterima</option>
                                            <option value="diagnosis">Diagnosis</option>
                                            <option value="customer_approval">Menunggu Persetujuan</option>
                                            <option value="repair">Perbaikan</option>
                                            <option value="testing">Testing</option>
                                            <option value="completed">Selesai</option>
                                        </select>
                                        {errors.status && (
                                            <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Biaya Service (Rp)
                                        </label>
                                        <input
                                            type="number"
                                            value={data.service_cost}
                                            onChange={(e) => setData('service_cost', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="0"
                                            min="0"
                                            step="1000"
                                        />
                                        {errors.service_cost && (
                                            <p className="text-red-500 text-sm mt-1">{errors.service_cost}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Biaya Spare Part (Rp)
                                        </label>
                                        <input
                                            type="number"
                                            value={data.parts_cost}
                                            onChange={(e) => setData('parts_cost', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="0"
                                            min="0"
                                            step="1000"
                                        />
                                        {errors.parts_cost && (
                                            <p className="text-red-500 text-sm mt-1">{errors.parts_cost}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Total Biaya (Rp)
                                        </label>
                                        <input
                                            type="number"
                                            value={data.total_cost}
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md"
                                            placeholder="0"
                                        />
                                        {errors.total_cost && (
                                            <p className="text-red-500 text-sm mt-1">{errors.total_cost}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={!!data.customer_approved}
                                        onChange={(e) => setData('customer_approved', e.target.checked ? 1 : 0)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">
                                        Pelanggan sudah menyetujui perbaikan dan biaya
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end space-x-3 pt-6 border-t">
                            <Link href="/services">
                                <Button type="button" variant="outline">
                                    Batal
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? '⏳ Menyimpan...' : '💾 Simpan Service'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}