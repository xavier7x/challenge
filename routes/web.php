<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

/*Route::get('/login', function () {
    return view('auth.login');
})->name('login');*/

//Route::get('/login', [App\Http\Controllers\Auth\LoginController::class, 'showLoginForm'])->name('login');
Route::middleware('web')->group(function () {
    Route::get('/sanctum/csrf-cookie', function (Request $request) {
        return response()->json(['message' => 'CSRF cookie set'], 200);
    });
});
