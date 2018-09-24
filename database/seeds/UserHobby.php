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
        $faker = Faker\Factory::create();

        $data = array(
            ['name' => 'Đá bóng'],
            ['name' => 'Đua xe' ],
            ['name' => 'Đánh bài'],
            ['name' => 'Rượu chè'],
            ['name' => 'Cướp ngân hàng'],
            ['name' => 'Cờ bạc'],
        );

        $data_1 = [];
        for($i=1; $i<20; $i++) {
            $temp = [
                'user_id' => $faker->randomDigit,
                'hobby_id' => $faker->randomDigit
            ];
            array_push($data_1, $temp);
        }

        DB::table('user_hobby')->insert($data);
        DB::table('user_hobby_map')->insert($data_1);
    }
}
