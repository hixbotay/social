<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        foreach (config('auth.action') AS $value){
            Gate::define($value, function ($user) use ($value){
                $result = $this->checkRole($value, $user->role);
                return $result;
            });
        }

    }

    private function checkRole($key, $roles){
        if (!is_array($roles) && !is_object($roles))return false;

        if (is_array($roles)){
            if (in_array($key, $roles))
                return true;
            return false;
        }
        if (is_object($roles)){
            if (property_exists($roles, $key))
                return true;
            return false;
        }
    }



    private function getUserRoles($groupID){
        $data = \App\UserGroup::find($groupID);
        if ($data->role)
        {
            $roles = json_decode($data->role, true);
            return $roles;
        }
        return array();
    }

}
