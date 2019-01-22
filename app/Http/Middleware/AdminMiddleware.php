<?php

namespace App\Http\Middleware;

use Closure;
use Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(Auth::check()) {
            $user = Auth::user();
            $key = config('auth.action.ACCESS_ADMIN');
            if (is_array($user->role) && in_array($key, $user->role)){
                return $next($request);
            }
            if (is_object($user->role) && property_exists($user->role, $key)){
                return $next($request);
            }

//            if($user->is_admin == 1) {
//                return $next($request);
//            }
        }
        return redirect('/admin/login');
    }
}
