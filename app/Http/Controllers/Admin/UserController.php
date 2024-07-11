<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function store(Request $request): RedirectResponse
    {

        $validation = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'username' => 'required|string|max:255|unique:' . User::class,
            'is_admin' => 'required',
            'is_dosen' => 'required',
            'aktif' => 'required',
            'password' => 'required',
        ]);
        if ($validation->fails()) {
            return redirect()->back()->withErrors($validation->errors());
        }

        $create = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'is_admin' => $request->is_admin,
            'is_dosen' => $request->is_dosen,
            'aktif' => $request->aktif,
            'password' => bcrypt($request->password),
            'foto' => 'foto-user/default.png',
        ]);
        if ($create) {
            return redirect()->back()->with("success", "User created successfully");
        }
        return redirect()->back()->withErrors(["error" => "Terjadi kesalahan sistem"]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validation = Validator::make($request->all(), [
            'id' => 'required',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'username' => 'required|string|max:255',
            'is_admin' => 'required',
            'is_dosen' => 'required',
            'aktif' => 'required',
        ]);
        if ($validation->fails()) {
            return redirect()->back()->withErrors($validation->errors());
        }
        $update = User::where('id', $request->id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'is_admin' => $request->is_admin,
            'is_dosen' => $request->is_dosen,
            'aktif' => $request->aktif,
            'foto' => 'foto-user/default.png',
        ]);
        if ($update) {
            return redirect()->back()->with("success", "User updated successfully");
        }
        return redirect()->back()->withErrors(["error" => "Terjadi kesalahan sistem"]);
    }

    public function destroy($id): RedirectResponse
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->back()->with("success", "User deleted successfully");
    }
}
