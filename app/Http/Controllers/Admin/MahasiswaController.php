<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MahasiswaController extends Controller
{
    public function index(){
        $mahasiswa = User::where('is_dosen', 0)->where('is_admin', 0)->paginate(10);
        return Inertia::render('Admin/Mahasiswa', ['mahasiswa' => $mahasiswa]);
    }
}
