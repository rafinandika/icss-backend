<?php

namespace App\Http\Controllers\api\v1;

use App\Helpers\ResponseHelpers;
use App\Http\Controllers\Controller;
use App\Mail\ResetPassword;
use App\Models\confirmation_kode;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\NewAccessToken;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid login details',
                'data' => null
            ], 401);
        }

        if (!Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            return response()->json([
                'success' => false,
                'message' => 'Username or password is incorrect',
                'data' => null
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('bml token')->plainTextToken;
        $user['token'] = $token;
        return response()->json([
            'success' => true,
            'message' => 'Login Berhasil',
            'data' => $user
        ], 200);
    }

    public function emailresetpassword($email)
    {
        $kode = random_int(100000, 999999);
        $user = User::where('email', $email)->first();
        if ($user !== null) {
            $exist = confirmation_kode::where(['email' => $email, 'type' => 'reset-password'])->first();
            if ($exist !== null) {
                $exist->update(['kode' => $kode]);
            } else {
                confirmation_kode::create([
                    'kode' => $kode,
                    'email' => $email,
                    'type' => 'reset-password',
                ]);
            }

            Mail::to($email)->send(new ResetPassword($user->name, $kode));
            return ResponseHelpers::success('Kode terkirim');
        }
        return ResponseHelpers::error(402, 'Email tidak ditemukan');
    }

    public function koderesetpassword(Request $request)
    {
        $exist = confirmation_kode::where(['email' => $request->email, 'type' => 'reset-password', 'kode' => $request->kode])->first();
        if ($exist !== null) {
            $exist->delete();
            return ResponseHelpers::success('Kode valid');
        }

        return ResponseHelpers::error(402, "$request->kode Kode tidak valid");
    }

    public function resetpassword(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid creadentials',
                'data' => null
            ], 401);
        }

        $user = User::where('email', $request->email)->first();
        if ($user !== null) {
            $user->update(['password' => bcrypt($request->password)]);
            return ResponseHelpers::success('Password berhasil di ubah');
        }

        return ResponseHelpers::error(402, 'Gagal mengubah password');
    }

    public function register(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string',
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid creadentials',
                'data' => null
            ], 401);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => bcrypt($request->password),
        ]);
        if ($user) {
            return ResponseHelpers::success('Registrasi Berhasil', $user);
        }
        return ResponseHelpers::error(402, 'Gagal registrasi');
    }
}
