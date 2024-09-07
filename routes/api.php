<?php

use App\Helpers\ResponseHelpers;
use App\Http\Controllers\api\v1\AuthController;
use App\Http\Controllers\api\v1\DiskusiController;
use App\Http\Controllers\api\v1\DosenController;
use App\Http\Controllers\api\v1\EvaluasiController;
use App\Http\Controllers\api\v1\MateriController;
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
Route::post('/register', [AuthController::class, 'register']);
Route::get('/email-reset-password/{email}', [AuthController::class, 'emailresetpassword']);
Route::post('/cek-kode-reset-password', [AuthController::class, 'koderesetpassword']);
Route::post('/reset-password', [AuthController::class, 'resetpassword']);

Route::prefix('user')->middleware('auth:sanctum')->group(function () {
    Route::get('/me', function (Request $request) {
        return ResponseHelpers::success('Success', $request->user());
    });
});

Route::get('/dosen', [DosenController::class, 'index']);

Route::prefix('materi')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [MateriController::class, 'index']);
    Route::get('{id}', [MateriController::class, 'detail']);
    Route::post('/search', [MateriController::class, 'search']);
});

Route::prefix('/dosen')->middleware('auth:sanctum')->group(function () {
    Route::get('/list', [DosenController::class, 'index']);
    Route::get('/detail/{id}', [DosenController::class, 'detail']);
});

Route::prefix('/evaluasi')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [EvaluasiController::class, 'list']);
    Route::get('{id}', [EvaluasiController::class, 'detail']);
    Route::post('submit', [EvaluasiController::class, 'submit']);
    Route::get('submit/{id}', [EvaluasiController::class, 'listsubmit']);
});

Route::post('/diskusi', [DiskusiController::class, 'store'])->middleware('auth:sanctum');
