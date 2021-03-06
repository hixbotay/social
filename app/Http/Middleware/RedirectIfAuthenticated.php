<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {

        if (Auth::guard($guard)->check()) {
            $user = Auth::user();
            // if($user->is_verify) {
//                if(Auth::user()->is_admin == 1) return redirect('/admin');
//                else
                    return redirect('/');
            // } else {
//                return redirect('/alert');
            // }
        }

        return $next($request);
    }
}
