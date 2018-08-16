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
<<<<<<< HEAD
        if (Auth::guard($guard)->check()) {
            if(Auth::user()->is_admin == 1) return redirect('/admin');
            return redirect('/home');
=======
        switch ($guard) {
            case 'admin': {
                if(Auth::guard($guard)->check()){
                    return redirect()->route('admin');
                }
                break;
            }
            
            default: { 
                if (Auth::guard($guard)->check()) {
                    return redirect('/home');
                }
                break;
            }
>>>>>>> bcfc43ec857c6a5cea610b4c0316b025a28968d8
        }

        return $next($request);
    }
}
