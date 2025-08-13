<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_id' => 'required|exists:customers,id',
            'technician_id' => 'nullable|exists:users,id',
            'laptop_brand' => 'required|string|max:255',
            'laptop_model' => 'required|string|max:255',
            'laptop_serial' => 'nullable|string|max:255',
            'initial_complaint' => 'required|string',
            'diagnosis' => 'nullable|string',
            'repair_notes' => 'nullable|string',
            'service_cost' => 'nullable|numeric|min:0',
            'parts_cost' => 'nullable|numeric|min:0',
            'total_cost' => 'nullable|numeric|min:0',
            'status' => 'required|in:received,diagnosis,customer_approval,repair,testing,completed',
            'customer_approved' => 'boolean',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'customer_id.required' => 'Pelanggan harus dipilih.',
            'customer_id.exists' => 'Pelanggan yang dipilih tidak valid.',
            'technician_id.exists' => 'Teknisi yang dipilih tidak valid.',
            'laptop_brand.required' => 'Merk laptop harus diisi.',
            'laptop_model.required' => 'Model laptop harus diisi.',
            'initial_complaint.required' => 'Keluhan awal harus diisi.',
            'status.required' => 'Status harus dipilih.',
            'status.in' => 'Status yang dipilih tidak valid.',
        ];
    }
}