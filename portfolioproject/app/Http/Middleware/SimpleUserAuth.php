<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SimpleUserAuth
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
        if(False == session("simple_user_auth")){
            return redirect("/");
        }
        return $next($request);
    }
}
