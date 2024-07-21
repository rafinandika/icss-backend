<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Evaluasi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class TugasController extends Controller
{
    public function index()
    {
        $tugas = Evaluasi::with('submit')->latest()->paginate(10);
        return Inertia::render('Admin/Tugas', ['tugas' => $tugas]);
    }

    public function store(Request $request): RedirectResponse
    {
        $Validation = Validator::make($request->all(), [
            'judul' => 'required',
            'deskripsi' => 'required',
        ]);
        if ($Validation->fails()) {
            return redirect()->back()->withErrors(["error" => $Validation->errors(), 'message' => 'Mohon periksa kembali formulir']);
        }
        $result = [
            'user_id' => auth()->user()->id,
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'type' => $request->type,
            'file' => $request->type === 'file' ? $request->file('file')->store('tugas') : null,
            'pertanyaan' => $request->type === 'file' ? null : json_encode($request->pertanyaan),
            'waktu_akhir' => $request->waktu_akhir,
            'aktif' => $request->aktif
        ];

        $tugas = Evaluasi::create($result);
        if (!$tugas) return redirect()->back()->withError(["message" => "Gagal menambahkan tugas"]);

        return redirect()->back()->with(["message" => "Berhasil menambahkan tugas"]);
    }
    public function update(Request $request, $id): RedirectResponse
    {
        $result = [
            'user_id' => auth()->user()->id,
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'type' => $request->type,
            'pertanyaan' => $request->type === 'file' ? null : json_encode($request->pertanyaan),
            'waktu_akhir' => $request->waktu_akhir,
            'aktif' => $request->aktif
        ];

        if($request->file('file') !== null) $result['file'] = $request->file('file')->store('tugas');

        $tugas = Evaluasi::find($id);
        $tugas->update($result);
        if (!$tugas) return redirect()->back()->withError(["message" => "Gagal mengubah tugas"]);

        return redirect()->back()->with(["message" => "Berhasil mengubah tugas"]);
    }

    public function destroy($id): RedirectResponse
    {
        $tugas = Evaluasi::find($id);
        if($tugas->type === 'file') Storage::delete($tugas->file);
        $tugas->delete();
        return redirect()->back()->with("success", "Tugas deleted successfully");
    }
}
