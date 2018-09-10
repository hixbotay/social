<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserHobby extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = array(
            ['name' => 'Đá bóng'],
            ['name' => 'Đua xe' ],
            ['name' => 'Đánh bài'],
            ['name' => 'Rượu chè'],
            ['name' => 'Cướp ngân hàng'],
            ['name' => 'Cờ bạc'],
        );
        DB::table('user_hobby')->insert($data);
    }
}
