import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Service {
    id: number;
    service_number: string;
    status: string;
    laptop_brand: string;
    laptop_model: string;
    total_cost: number;
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

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedServices {
    data: Service[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Filters {
    status?: string;
    search?: string;
}

interface Props {
    services: PaginatedServices;
    filters: Filters;
    [key: string]: unknown;
}

export default function ServicesIndex({ services, filters }: Props) {
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
        };
        return texts[status as keyof typeof texts] || status;
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        const status = formData.get('status') as string;
        
        router.get('/services', {
            search: search || undefined,
            status: status || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <AppShell>
            <Head title="Daftar Service - ServiceLab Pro" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Daftar Service</h1>
                        <p className="text-gray-600">Kelola semua service laptop</p>
                    </div>
                    <Link href="/services/create">
                        <Button>
                            <span className="mr-2">➕</span>
                            Service Baru
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                name="search"
                                defaultValue={filters.search || ''}
                                placeholder="Cari nomor service, pelanggan, atau laptop..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="sm:w-48">
                            <select
                                name="status"
                                defaultValue={filters.status || ''}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Semua Status</option>
                                <option value="received">Diterima</option>
                                <option value="diagnosis">Diagnosis</option>
                                <option value="customer_approval">Menunggu Persetujuan</option>
                                <option value="repair">Perbaikan</option>
                                <option value="testing">Testing</option>
                                <option value="completed">Selesai</option>
                            </select>
                        </div>
                        <Button type="submit" variant="outline">
                            🔍 Filter
                        </Button>
                        {(filters.search || filters.status) && (
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => router.get('/services')}
                            >
                                Reset
                            </Button>
                        )}
                    </form>
                </div>

                {/* Services Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {services.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Service
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Pelanggan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Laptop
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Teknisi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {services.data.map((service) => (
                                            <tr key={service.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {service.service_number}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{service.customer.name}</div>
                                                    <div className="text-sm text-gray-500">{service.customer.phone}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {service.laptop_brand} {service.laptop_model}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {service.technician?.name || '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}>
                                                        {getStatusText(service.status)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {service.total_cost > 0 ? formatCurrency(service.total_cost) : '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatDate(service.created_at)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                    <Link
                                                        href={`/services/${service.id}`}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        Detail
                                                    </Link>
                                                    <Link
                                                        href={`/services/${service.id}/edit`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Pagination */}
                            {services.last_page > 1 && (
                                <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 flex justify-between sm:hidden">
                                            {services.links[0].url && (
                                                <Link
                                                    href={services.links[0].url!}
                                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                    Previous
                                                </Link>
                                            )}
                                            {services.links[services.links.length - 1].url && (
                                                <Link
                                                    href={services.links[services.links.length - 1].url!}
                                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                    Next
                                                </Link>
                                            )}
                                        </div>
                                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-sm text-gray-700">
                                                    Menampilkan{' '}
                                                    <span className="font-medium">
                                                        {(services.current_page - 1) * services.per_page + 1}
                                                    </span>{' '}
                                                    sampai{' '}
                                                    <span className="font-medium">
                                                        {Math.min(services.current_page * services.per_page, services.total)}
                                                    </span>{' '}
                                                    dari{' '}
                                                    <span className="font-medium">{services.total}</span> service
                                                </p>
                                            </div>
                                            <div>
                                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                                    {services.links.map((link, index) => 
                                                        link.url && link.url !== '#' ? (
                                                            <Link
                                                                key={index}
                                                                href={link.url!}
                                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                                    link.active
                                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                                } ${
                                                                    index === 0 ? 'rounded-l-md' : ''
                                                                } ${
                                                                    index === services.links.length - 1 ? 'rounded-r-md' : ''
                                                                }`}
                                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                            />
                                                        ) : (
                                                            <span
                                                                key={index}
                                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                                    link.active
                                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                                        : 'bg-white border-gray-300 text-gray-500'
                                                                } ${
                                                                    index === 0 ? 'rounded-l-md' : ''
                                                                } ${
                                                                    index === services.links.length - 1 ? 'rounded-r-md' : ''
                                                                }`}
                                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                            />
                                                        )
                                                    )}
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔧</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada service</h3>
                            <p className="text-gray-500 mb-6">
                                {filters.search || filters.status 
                                    ? 'Tidak ada service yang sesuai dengan kriteria pencarian.'
                                    : 'Mulai dengan menambahkan service laptop pertama Anda.'
                                }
                            </p>
                            <Link href="/services/create">
                                <Button>
                                    <span className="mr-2">➕</span>
                                    Tambah Service Baru
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}