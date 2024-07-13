<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DosenController extends Controller
{
    public function index()
    {
        $dosen = Dosen::with('user')->paginate(10);
        return Inertia::render('Admin/Dosen', ["dosen" => $dosen]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = User::create([
            'name' => $request->user['name'],
            'email' => $request->user['email'],
            'password' => bcrypt($request->user['password']),
            'username' => $request->user['username'],
            'is_dosen' => 1,
            'is_admin' => $request->user['is_admin'],
            'foto' => $request->file('foto')->store('dosen'),
            'aktif' => 1
        ]);

        if (!$user) {
            return redirect()->back()->withErrors(["message" => "Gagal membuat user"]);
        }

        $dosen = Dosen::create([
            'nama' => $request->nama,
            'nip' => $request->nip,
            'user_id' => $user->id,
            'tempat_lahir' => $request->tempat_lahir,
            'tanggal_lahir' => $request->tanggal_lahir,
            'menikah' => $request->menikah,
            'istri' => $request->istri,
            'pendidikan' => json_encode($request->pendidikan),
            'deskripsi' => $request->deskripsi,
            'foto' => $user->foto,
            'anak' => $request->anak === null ? null :  json_encode($request->anak),
        ]);

        if (!$dosen) {
            return redirect()->back()->withErrors(["message" => "Gagal membuat dosen"]);
        }

        return redirect()->back()->withSuccess(["message" => "Berhasil menambahkan dosen"]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $dataUser = [
            'name' => $request->user['name'],
            'email' => $request->user['email'],
            'username' => $request->user['username'],
            'is_admin' => $request->user['admin'],
            'aktif' => 1
        ];

        if ($request->file('foto') !== null) {
            $dataUser['foto'] = $request->file('foto')->store('dosen');
        }
        $user = User::find($request->user['id']);

        if (!$user->update($dataUser)) {
            return redirect()->back()->withErrors(["message" => "Gagal mengubah data user"]);
        }

        $dataDosen = [
            'nama' => $request->nama,
            'nip' => $request->nip,
            'tempat_lahir' => $request->tempat_lahir,
            'tanggal_lahir' => $request->tanggal_lahir,
            'menikah' => $request->menikah,
            'istri' => $request->istri,
            'pendidikan' => json_encode($request->pendidikan),
            'deskripsi' => $request->deskripsi,
            'anak' => $request->anak === null ? null :  json_encode($request->anak),
        ];

        if ($request->file('foto') !== null) {
            $dataDosen['foto'] = $dataUser['foto'];
        }

        $dosen = Dosen::find($id);

        if (!$dosen->update($dataDosen)) {
            return redirect()->back()->withErrors(["message" => "Gagal mengubah data dosen"]);
        }

        return redirect()->back()->withSuccess(["message" => "Berhasil mengubah data dosen"]);
    }

    public function destroy($id) : RedirectResponse
    {
        $dosen = Dosen::find($id);
        $user = User::find($dosen->user_id);
        $user->delete();
        $dosen->delete();
        return redirect()->back()->withSuccess(["message" => "Berhasil menghapus dosen"]);
    }
}
