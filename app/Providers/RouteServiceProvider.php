<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use App\Http\Middleware\RoleMiddleware;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Daftarkan middleware alias
        Route::aliasMiddleware('role', RoleMiddleware::class);

        // Routing file default
        Route::middleware('web')->group(base_path('routes/web.php'));
        Route::middleware('api')->prefix('api')->group(base_path('routes/api.php'));
    }
}