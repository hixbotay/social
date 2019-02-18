<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use \App\Notification;

date_default_timezone_set('Asia/Saigon');

class Post extends Controller
{
    public static function list() {
        $user_id = Auth::id();

        $friends = DB::table('user_relationship')
            ->where('is_like', '=', 1)
            ->orWhere('is_loved', '=', 1)
            ->having('from_user_id', '=', $user_id)
            ->get();

        $friend_id_arr = [$user_id];
        foreach($friends as $friend) {
            array_push($friend_id_arr, $friend->id);
        }

        $result = \App\Post::whereIn('posts.user_id', $friend_id_arr)
            ->join('users AS users', 'posts.user_id', '=', 'users.id')
            ->leftjoin('users AS author', 'posts.original_author', '=', 'author.id')
            ->leftjoin('post_photos', 'posts.id', '=', 'post_photos.post_id')
            ->leftjoin('user_photos', 'user_photos.id', '=', 'post_photos.photo_id')
            ->select(
                'users.name AS user_name', 
                'users.avatar AS user_avatar', 
                'posts.*', 
                'user_photos.id AS photo_id', 
                'user_photos.source',
                'author.name AS original_author_name',
                'author.avatar AS original_author_avatar'
            )
            ->orderBy('id', 'DESC')
            ->paginate(10);
        
        return json_encode($result);
    }

    public function getMyPosts() {
        $result = \App\Post::where('posts.user_id', Auth::id())
            ->join('users AS users', 'posts.user_id', '=', 'users.id')
            ->leftjoin('users AS author', 'posts.original_author', '=', 'author.id')
            ->leftjoin('post_photos', 'posts.id', '=', 'post_photos.post_id')
            ->leftjoin('user_photos', 'user_photos.id', '=', 'post_photos.photo_id')
            ->select(
                'users.name AS user_name', 
                'users.avatar AS user_avatar', 
                'posts.*', 
                'user_photos.id AS photo_id', 
                'user_photos.source',
                'author.name AS original_author_name',
                'author.avatar AS original_author_avatar'
            )
            ->orderBy('id', 'DESC')
            ->paginate(10);

        return json_encode($result);
    }

    public function react(Request $request, $post_id){
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

    public function unreact(Request $request, $post_id){
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

    public function createPost(Request $request) {
        $user_id = Auth::id();
        $data = json_decode($request->getContent());

        $photo = null;
        if($data->image) {
            $base64_image = explode(',', $data->image)[1];

            $firstChar = substr($base64_image, 0, 1);

            switch($firstChar) {
                case '/': {
                    $extension = 'jpg';
                    break;
                }
                case 'i': {
                    $extension = 'png';
                    break;
                }
                case 'R': {
                    $extension = 'gif';
                    break;
                }
                default: {
                    $extension = 'jpg';
                    break;
                }
            }
    
            $filename = (string) time().'.'.$extension;
            
            Storage::disk('local')->put('user'.$user_id.'/photos/'.$filename, base64_decode($base64_image));
            $photo = \App\UserPhoto::create([
                'user_id' => $user_id,
                'source' => 'storage/app/user'.$user_id.'/photos/'.$filename,
                'type' => 'timeline'
            ]);
        }
        
        $newPost = [
            'user_id' => $user_id,
            'content' => $data->content
        ];
        $post = \App\Post::create($newPost);

        if($photo) {
            DB::table('post_photos')->insert([
                'post_id' => $post->id,
                'photo_id' => $photo->id,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ]);

            $post->photo_id = $photo->id;
            $post->source = $photo->source;
        }

        // Notify to person who follows the author
        $followers = DB::table('user_relationship')
            ->where('is_loved', '=', 1)
            ->orWhere('is_like', '=', 1)
            ->having('to_user_id', '=', $user_id)
            ->get();

        $notifications = [];
        foreach($followers as $follower) {
            array_push(
                $notifications, 
                [
                    'user_id' => $follower->from_user_id,
                    'actor' => $user_id, // Auth::id()
                    'content' => "Đã đăng status mới",
                    'type' => "status",
                    'created_at' => date("Y-m-d H:i:s"),
                    'updated_at' => date("Y-m-d H:i:s")
                ]
            );
        }
        Notification::insert($notifications);

        return ['post' => $post];
    }

    public function share(Request $request) {
        $post_id = $request->get('post_id');
        $user_id = Auth::id();
        // get original post
        $original_post = \App\Post::leftjoin('post_photos', 'post_id', '=', 'posts.id')
            ->leftjoin('user_photos', 'post_photos.photo_id', '=', 'user_photos.id')
            ->where('posts.id', $post_id)
            ->select(DB::raw("posts.*, user_photos.source"))
            ->first();
        
            // create new post as shared post
        $new_post = \App\Post::create([
            'user_id' => $user_id,
            'content' => $original_post->content,
            'original_author' => $original_post->user_id,
            'original_created' => $original_post->created_at->toDateTimeString("Y-m-d H:i:s"),
            'original_post' => $original_post->id
        ]);

        if($original_post->source) {
            $photo = \App\UserPhoto::create([
                'user_id' => $user_id,
                'source' => $original_post->source,
                'type' => 'shared'
            ]);
    
            DB::table("post_photos")->insert(['post_id' => $new_post->id, 'photo_id' => $photo->id]);
            $new_post->photo_id = $photo->id;
            $new_post->source = $original_post->source;
        }

        $original_author = \App\User::find($original_post->user_id);
        
        $new_post->original_author_name = $original_author->name;
        $new_post->original_author_avatar = $original_author->avatar;

        return ['post' => $new_post];
    }

    public function removePost($id) {
        $user_id = Auth::id();
        $post = \App\Post::where([['user_id', '=', $user_id], ['id', '=', $id]])->get();
        $sharedPosts = \App\Post::where([['original_post', '=', $id]])->get();

        $postArr = $sharedPosts->merge($post);

        foreach($postArr as $item) {
            $item->delete();
            $postPhoto = \App\PostPhoto::where('post_id', $item->id)->first();
            if($postPhoto) {
                $photo = \App\UserPhoto::where('id', $postPhoto->photo_id)->first();
                $postPhoto->delete();
                if($photo) $photo->delete();
                Storage::delete(substr($photo->source, 11));
            }
        }

        return ['ok' => 1];
    }

    public function updatePost(Request $request, $id) {
        $user_id = Auth::id();
        $post = \App\Post::where([
            ['user_id', '=', $user_id],
            ['id', '=', $id]
        ])->first();
        
        $post->content = $request->get('content');
        $post->updated_at = date("Y-m-d H:i:s");
        $post->save();
        return ['post' => $post];
    }
}
