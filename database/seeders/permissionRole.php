<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class permissionRole extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'manage-users',
            'manage-role',
            'manage-permission',

            // Permission Sekretaris
            'manage-agenda',
            'manage-documents',
            'create-report',

            // Permission Bendahara
            'view-finances',
            'manage-income',
            'manage-expenses',
            'generate-financial-reports',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $superAdmin = Role::firstOrCreate(['name' => 'superAdmin']);
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $sekretaris = Role::firstOrCreate(['name' => 'sekretaris']);
        $bendahara = Role::firstOrCreate(['name' => 'bendahara']);


        $superAdmin->givePermissionTo([
            'manage-users',
            'manage-role',
            'manage-permission',

            // Permission Sekretaris
            'manage-agenda',
            'manage-documents',
            'create-report',

            // Permission Bendahara
            'manage-income',
            'manage-expenses',
            'generate-financial-reports',
        ]);

        $admin->givePermissionTo([
            'manage-users',
        ]);

        $sekretaris->givePermissionTo([
            // Permission Sekretaris
            'manage-agenda',
            'manage-documents',
            'create-report',
        ]);

        $bendahara->givePermissionTo([
            // Permission Bendahara
            'view-finances',
            'manage-income',
            'manage-expenses',
            'generate-financial-reports',
        ]);
    }
}
