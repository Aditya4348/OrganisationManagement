<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:20'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'avatar' => ['nullable', 'string'],
            'gender' => ['nullable', 'string', Rule::in(['male', 'female'])],
            'phone_number' => ['nullable', 'string'],
            'address' => ['nullable', 'string'],
            'membership_status' => ['nullable', 'string', Rule::in(['active', 'inactive'])],
            'join_date' => ['nullable', 'date'],
        ];
    }
}
