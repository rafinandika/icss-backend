<?php 

namespace App\Helpers;

class ResponseHelpers{
    public static function success($message="Request berhasil", $data = [], $status = 200, $success=true){
        return response()->json([
            "success"=> $success,
            "message" => $message,
            "data" => $data
        ], $status);
    }

    public static function error($status = 400, $message= "Request gagal", $data = [], $success = false){
        return response()->json([
            "success" => $success,
            "message" => $message,
            "data" => $data
        ], $status);
    }
}