<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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
}
