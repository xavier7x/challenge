<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ClientController;

// Rutas públicas
//Route::post('/login', [AuthController::class, 'login']);
//Route::post('/register', [AuthController::class, 'register']);

Route::post('/register', [AuthController::class, 'createUser']);
Route::post('/login', [AuthController::class, 'loginUser']);

// Rutas protegidas por Sanctum
Route::middleware(['auth:sanctum'])->group(function () {
    //Route::apiResource('/clients', ClientController::class);
    Route::apiResource('/clients', ClientController::class);
    //Route::post('/logout', [AuthController::class, 'logout']);
});

