<?php

use Illuminate\Database\Seeder;

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
        ]);
    }
}
