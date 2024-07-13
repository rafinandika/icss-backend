<?php

namespace App\Http\Controllers\api\v1;

use App\Helpers\ResponseHelpers;
use App\Http\Controllers\Controller;
use App\Models\Dosen;
use Illuminate\Http\Request;

class DosenController extends Controller
{
    public function index(){
        $dosens = Dosen::latest()->get();
        foreach ($dosens as &$item) {
            $item['foto'] = url('storage/'.$item['foto']);
        }
        return ResponseHelpers::success("Berhasil mengambil data dosen", $dosens);
    }

    public function detail($id){
        $dosen = Dosen::find($id);
        $dosen['foto'] =  url('storage/'. $dosen['foto']);
        return ResponseHelpers::success("Berhasil mengambil detail dosen", $dosen);
    }
}
