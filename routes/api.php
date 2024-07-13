<?php


use App\Http\Controllers\api\v1\AuthController;
use App\Http\Controllers\api\v1\DosenController;
use App\Http\Controllers\api\v1\MateriController;
use App\Http\Controllers\api\v1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::prefix('user')->middleware('auth:sanctum')->group(function () {
    Route::get('/me', function (Request $request) {
        return $request->user();
    });
});

Route::get('/dosen', [DosenController::class, 'index']);
Route::get('/materi', [MateriController::class, 'index']);
Route::get('/materi/{id}', [MateriController::class, 'detail']);

Route::prefix('/dosen')->middleware('auth:sanctum')->group(function () {
    Route::get('/list', [DosenController::class, 'index']);
    Route::get('/detail/{id}', [DosenController::class, 'detail']);
});
