<?php

use App\Http\Controllers\Admin\DosenController;
use App\Http\Controllers\Admin\MahasiswaController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;


Route::prefix('mahasiswa')->group(function () {
    Route::get('/', [MahasiswaController::class, 'index'])->name('mahasiswa');
    Route::post('/', [UserController::class, 'store'])->name('mahasiswa.store');
    Route::put('/', [UserController::class, 'update'])->name('mahasiswa.update');
    Route::delete('/{id}', [UserController::class, 'destroy'])->name('mahasiswa.destroy');
});

Route::prefix('dosen')->group(function () {
    Route::get('/', [DosenController::class, 'index'])->name('dosen');
    Route::post('/', [DosenController::class, 'store'])->name('dosen.store');
    Route::put('/{id}', [DosenController::class, 'update'])->name('dosen.update');
});
