<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Post extends Controller
{
    public function like(Request $request, $post_id){
        $data = $request->getContent();
        $post = \App\Post::find($post_id);
        $type = $data['type'];
        $return = array();
        if ($post->id){
            $oldData = json_decode($post->$type);
            $oldData[] = $data['user_id'];
            $post->$type = json_encode($oldData);
            $result = $post->save();
            if ($result){
                $return['message'] = "Thành công";
                return response()->json($return, 200);
            }else{
                $return['message'] = "Có lỗi, vui lòng thử lại sau";
                return response()->json($return, 500);

            }
        }else{
            $return['message'] = "Bài viết không tồn tại";
            return response()->json($return, 404);
        }
    }

    public function unlike(Request $request, $post_id){
        $data = $request->getContent();
        $post = \App\Post::find($post_id);
        $type = $data['type'];
        $return = array();
        if ($post->id){
            $oldData = json_decode($post->$type);
            foreach ($oldData AS $key => $value){
                if ($value == $data['user_id']){
                    unset($oldData[$key]);
                }
            }
            $post->$type = json_encode($oldData);
            $result = $post->save();
            if ($result){
                $return['message'] = "Thành công";
                return response()->json($return, 200);
            }else{
                $return['message'] = "Có lỗi, vui lòng thử lại sau";
                return response()->json($return, 500);

            }
        }else{
            $return['message'] = "Bài viết không tồn tại";
            return response()->json($return, 404);
        }
    }
}
