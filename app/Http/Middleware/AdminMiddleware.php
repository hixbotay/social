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
    public function handle( $request, Closure $next)
    {
        // if ($request->user() && $request->user()->is_verify == 1 ){
        //     if($request->user()->is_admin == 1) {
        //         return $next($request);   
        //     }
        // }
        if(Auth::check()) {
            $user = Auth::user();
            if($user->is_verify == 1 && $user->is_admin == 1) {
                return $next($request);
            }
        }
        return redirect('/admin/login');
    }
}
