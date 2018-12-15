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
        Gate::define(config('auth.action.ACCESS_ADMIN'), function ($user){
            if ($user->is_admin == 1){
                return true;
            }
            return false;
        });
        Gate::define(config('auth.action.LIST_POST'), function ($user){
            $data = $this->getUserRoles($user->group_id);
            $haveRole = false;
            if (!empty($data) && in_array(config('auth.action.LIST_POST'), $data)){
                $haveRole = true;
            }
            return $haveRole;
        });

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
