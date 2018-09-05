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
        DB::table('user_groups')->insert([
            'name' => 'administrator',
        ]);
    }

    /**
     * ,[
    'name' => 'shareholders',
    ],[
    'name' => 'general_operation',
    ],[
    'name' => 'province_operation',
    ],[
    'name' => 'district_operation',
    ],[
    'name' => 'member_brands',
    ],[
    'name' => 'member_special',
    ],[
    'name' => 'member_guaranteed',
    ],[
    'name' => 'member_vip',
    ],[
    'name' => 'member_official',
    ],[
    'name' => 'member_temporary',
    ],[
    'name' => 'guest',
    ]
     *
     */

}
