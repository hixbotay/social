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
        DB::table('user_hobby')->insert([
            'name' => 'Đá bóng',
        ],[
            'name' => 'Đua xe'
        ]);
    }
}
