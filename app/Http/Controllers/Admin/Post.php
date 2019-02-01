<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Post as PostModel;
use Illuminate\Support\Facades\DB;
use App\User;
use Session;
use URL;

class Post extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $request = Request::capture();

        $filter = isset($_GET['filter'])?$_GET['filter']:array();

        $this->authorize(config('auth.action.LIST_POST'));
        $posts = DB::table('posts')
            ->where(function ($query) use ($filter) {
                if (isset($filter['user_id']) && $filter['user_id']){
                    $query->where('posts.user_id', '=', $filter['user_id']);
                }
                if (isset($filter['time_from']) && isset($filter['time_to']) && $filter['time_from'] && $filter['time_to']){
                    $query->where('posts.created_at', '>=', $filter['time_from']);
                    $query->where('posts.created_at', '<=', $filter['time_to']);
                }
            })
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->select('posts.*', 'users.name')->orderBy('id', 'DESC')
            ->paginate(20);

        $users = User::all();
        $dataURL = $request->query();
        unset($dataURL['page']);
        $posts->withPath('admin?'.http_build_query($dataURL));


        return view('admin.post.list', [
            'items' => $posts,
            'users' => $users,
            'filter' => $filter
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.post.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $new_post = $request->get('data');
        $new_post['content'] = trim(strip_tags($new_post['content']));
        console_log($new_post);

        PostModel::create($new_post);

        return redirect('/admin?view=Post');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $post = PostModel::find($id);

        // show the view and pass the nerd to it
        return view('admin.post.detail', ['item' => $post]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $id =  $request->input('id');
        $post = PostModel::find($id);
        $data = $request->get('data');

        unset($data['user_id']);
        $post['content'] = trim(strip_tags($data['content']));

        $post->save();
        return redirect('admin?view=Post');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id =  $request->input('id');
        PostModel::destroy($id);
        // redirect to previous url after destroy
        Session::put('pre_url', URL::previous());
        console_log(Session::get('pre_url'));
        return redirect(Session::get('pre_url'));
    }
}
