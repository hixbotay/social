<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Notification extends Controller
{
    public function list() {
        $notifications = \App\Notification::where('user_id', '=', Auth::id())
            ->leftjoin('users', 'users.id', '=', 'actor')
            ->select(DB::raw('notifications.*, users.id AS actor_id, users.name AS actor_name, users.avatar AS actor_avatar'))
            ->orderBy('created_at', 'DESC')
            ->paginate(5);
        return json_encode($notifications);
    }

    public function markRead($id) {
        $notification  = \App\Notification::find($id);
        $notification->is_read = 1;
        $notification->update();
        return json_encode(['is_read' => 1]);
    }

    public function markAllAsRead() {
        $results  = \App\Notification::where([['user_id', '=', Auth::id()], ['is_read', '=', 0]])
            ->update(['is_read' => 1]);
        return json_encode($results);
    }

    public function countUnread() {
        $result  = \App\Notification::where([['user_id', '=', Auth::id()], ['is_read', '=', 0]])->count();
        return json_encode($result);
    }
}