<?php

namespace App\Http\Controllers\api\v1;

use App\Helpers\ResponseHelpers;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Evaluasi;
use App\Models\Submit;
use Illuminate\Http\Request;

class EvaluasiController extends Controller
{
    public function list()
    {
        $evaluasi = Evaluasi::all();
        return ResponseHelpers::success("Berhasil mengambil data evaluasi", $evaluasi);
    }

    public function detail($id)
    {
        $evaluasi = Evaluasi::find($id);

        if ($evaluasi['type'] === 'file') $evaluasi['file'] = url('storage/' . $evaluasi['file']);
        else $evaluasi['pertanyaan'] = json_decode($evaluasi['pertanyaan']);
        $submit = Submit::where(['evaluasi_id' => $id, 'user_id' => auth()->user()->id])->first();
        $evaluasi['submit'] = $submit;

        return ResponseHelpers::success("Berhasil mengambil data evaluasi", $evaluasi);
    }

    public function submit(Request $request){
        $evaluasi = Evaluasi::find($request->evaluasi_id);
        $evaluasi->submit()->create([
            'user_id' => auth()->user()->id,
            'type' => $request->type,
            'file' => $request->file,
            'deskripsi' => $request->deskripsi
        ]);
        return ResponseHelpers::success("Berhasil mengirimkan evaluasi", null, 201);
    }

    public function listsubmit($id){
        $submit = Submit::with('user')->where('evaluasi_id', $id)->paginate(10);
        return ResponseHelpers::success("Berhasil mengambil data evaluasi", $submit);
    }
}
