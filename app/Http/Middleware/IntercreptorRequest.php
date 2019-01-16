<?php

namespace App\Http\Middleware;

use Closure;

class IntercreptorRequest
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
        if($request->has('q')) {
            unset($request['q']);
        }

        return $next($request);
    }
}
