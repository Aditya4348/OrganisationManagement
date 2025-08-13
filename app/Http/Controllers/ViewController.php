<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class ViewController extends Controller
{

    public function dashboard()
    {
        return Inertia::render('Dashboard');
    }

    public function ListUser()
    {

        $user = User::where('id', '!=', auth()->id())
            ->whereDoesntHave('roles', function ($q) {
                $q->where('name', 'superAdmin');
            })
            ->with('roles') // supaya role ikut diambil
            ->get();
        
        $roles = Role::select('id', 'name', 'guard_name')->get();

        return Inertia::render('SuperAdmin/ManageUserApp', [
            'response' => [
                'message' => 'Successfully get all users',
                'count' => $user->count(),
                'roles' => $roles,
                'data' => [
                    'users' => UserResource::collection($user)->resolve(),
                ],
            ]
        ]);
    }


}
