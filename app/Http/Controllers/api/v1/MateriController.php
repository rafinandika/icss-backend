<?php

namespace App\Http\Controllers\api\v1;

use App\Helpers\ResponseHelpers;
use App\Http\Controllers\Controller;
use App\Models\Materi;
use Illuminate\Http\Request;

class MateriController extends Controller
{
    public function index(){
        $materis = Materi::latest()->get();
        foreach ($materis as &$item) {
            $item['file'] = url('storage/'.$item['file']);
        }
        return ResponseHelpers::success("Berhasil mengambil data materi", $materis);
    }
    
    public function detail($id){
        $materi = Materi::find($id);
        $materi['file'] = url('storage/'.$materi['file']);
            return ResponseHelpers::success("Berhasil mengambil data materi", $materi);
    }
}
