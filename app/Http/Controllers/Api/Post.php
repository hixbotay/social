<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class Post extends Controller
{
    public static function list() {
        $result = \App\Post::leftjoin('users', 'posts.user_id', '=', 'users.id')
            ->leftjoin('post_photos', 'posts.id', '=', 'post_photos.post_id')
            ->leftjoin('user_photos', 'user_photos.id', '=', 'post_photos.photo_id')
            ->select('users.id AS author_id', 'users.name AS author', 'users.avatar AS author_avatar', 'posts.*', 'user_photos.id AS photo_id', 'user_photos.source')
            ->orderBy('id', 'DESC')
            ->get();
        
        return json_encode($result);
    }

    public function like(Request $request, $post_id){
        $user_id = Auth::id();
        // $user_id = 1;
        $data = json_decode($request->getContent());

        $post = \App\Post::find($post_id);

        $type = $data->type;
        
        $return = array();
        if ($post->id){
            $oldData = $post->$type ? json_decode($post->$type) : [] ;
            
            if(in_array($user_id, $oldData)) {
                $return['message'] = "Lỗi. Bạn đã thích bài viết này trước đó.";
                return response()->json($return, 500);
            }
            $oldData[] = $user_id;
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
        $data = json_decode($request->getContent());
        $post = \App\Post::find($post_id);
        $type = $data->type;
        $return = array();
        if ($post->id){
            $oldData = $post->$type ? json_decode($post->$type) : [];
            foreach ($oldData as $key => $value){
                if ($value == Auth::id()){
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
