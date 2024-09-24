<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Materi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MateriController extends Controller
{
    public function index()
    {
        $materi = Materi::latest()->paginate(10);
        $materi->sortBy('judul', 'desc');
        return Inertia::render('Admin/Materi', ['materi' => $materi]);
    }

    public function store(Request $request): RedirectResponse
    {
        $materi = Materi::create([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'video' => $request->video,
            'file' => $request->file('file')->store('materi'),
            'type' => $request->type
        ]);

        if ($materi) {
            return redirect()->back()->with("success", "Materi created successfully");
        }
        return redirect()->back()->withErrors(["error" => "Terjadi kesalahan sistem"]);
    }

    public function update(Request $request, $id): RedirectResponse

    {

        $materi = Materi::find($id);
        $fileNow = $materi->file;
        $data = [
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'video' => $request->video,
            'type' => $request->type
        ];

        if ($request->file('file') !== null) {
            $data['file'] = $request->file('file')->store('materi');
        }
        $materi->update($data);
        if ($materi) {
            return redirect()->back()->with("success", "Materi updated successfully");
        }
        return redirect()->back()->withErrors(["error" => "Terjadi kesalahan sistem"]);
    }

    public function destroy($id): RedirectResponse
    {
        $materi = Materi::find($id);
        Storage::delete($materi->file);
        $materi->delete();
        return redirect()->back()->with("success", "Materi deleted successfully");
    }
}
