<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Dummy route supaya file gak kosong total
Route::get('/ping', fn () => ['message' => 'pong']);
