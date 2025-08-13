<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Manage\UserController;
use App\Http\Controllers\ViewController;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Pail\ValueObjects\Origin\Console;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route for View Page
Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('dashboard')->group(function () {
        
        Route::get('/', [ViewController::class, 'dashboard'])->name('dashboard');
        Route::get('/member', [ViewController::class, 'ListUser'])->name('usersList-student');
        // Route::get('/siswa/{student}', [ViewController::class, 'DetailStudent'])->name('users.detail-student');
    });
});

// ROUTE FOR ACTIONS
Route::middleware(['auth', 'verified'])->group(function () {

    Route::resource('user', UserController::class)->only(['store', 'update', 'destroy']);
});

require __DIR__ . '/setting.php';
require __DIR__ . '/auth.php';
