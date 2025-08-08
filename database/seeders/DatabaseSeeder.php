<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $superAdmin = User::factory()->create([
            'name' => 'User Super Admin',
            'email' => 'superadmin@example.com',
        ]);
        $superAdmin->assignRole('super_admin');

        $admin = User::factory()->create([
            'name' => 'User Admin',
            'email' => 'admin@example.com',
        ]);
        $admin->assignRole('admin');
    }
}
