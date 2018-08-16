<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserGroup extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            'name' => 'Default Group SuperAdmin',
        ];
        print_r($data);
        DB::table('user_groups')->truncate();
        factory(App\UserGroup::class)->make();   
    }
}
