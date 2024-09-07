<?php

namespace App\Http\Controllers\api\v1;

use App\Helpers\ResponseHelpers;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class DiskusiController extends Controller
{
    public function index(Request $request){
        $user = $request->user();
    }

    public function store(Request $request){
        $data = [
            'user_id' => $request->user()->id,
            'materi_id' => $request->materi_id,
            'comment' => $request->comment,
            'parent' => $request->parent
        ];
        $comment = Comment::create($data);
        if($comment){
            return ResponseHelpers::success("Berhasil mengirim diskusi", $comment, 201);
        }

        return ResponseHelpers::error(400, "Gagal mengirim diskusi");
    }
}