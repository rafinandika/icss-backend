<?php

namespace App\Http\Controllers\api\v1;

use App\Helpers\ResponseHelpers;
use App\Http\Controllers\Controller;
use App\Models\Materi;
use Illuminate\Http\Request;

class MateriController extends Controller
{
    public function index()
    {
        $materis = Materi::latest()->get();
        foreach ($materis as &$item) {
            $item['file'] = url('storage/' . $item['file']);
        }
        return ResponseHelpers::success("Berhasil mengambil data materi", $materis);
    }

    public function detail($id)
    {
        $idint = (int) $id;
        $materi = Materi::with('diskusi')->find($idint);
        if ($materi === null) return ResponseHelpers::error("Materi not found", 404);
        $materi['file'] = url('storage/' . $materi['file']);
        if ($materi['diskusi'] === null) return ResponseHelpers::success("Berhasil mengambil data materi", $materi);
        foreach ($materi['diskusi'] as &$item) {
            $item['uid'] = $item->user->username;
            $item['nama'] = $item->user->name;
            unset($item['user']);
        }
        return ResponseHelpers::success("Berhasil mengambil data materi", $materi);
    }

    public function search(Request $request)
    {
        $results = Materi::where('judul', 'like', "%$request->q%")->get();
        if ($results->count() === 0) {
            return ResponseHelpers::success("Berhasil mengambil data materi", []);
        }
        foreach ($results as &$item) {
            $item['file'] = url('storage/' . $item['file']);
        }
        return ResponseHelpers::success("Berhasil mengambil data materi", $results);
    }
}
