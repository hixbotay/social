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

        $data = array(
            ['name' => 'administrator', 'key' => 'administrator'],
            ['name' => 'Cổ đông', 'key' => 'shareholders'],
            ['name' => 'Điều hành chung', 'key' => 'general_operation'],
            ['name' => 'Điều hành tỉnh', 'key' => 'province_operation'],
            ['name' => 'Điều hành huyện', 'key' => 'district_operation'],
            ['name' => 'Thành viên thương hiệu', 'key' => 'member_brands'],
            ['name' => 'Thành viên đặc biệt', 'key' => 'memeber'],
            ['name' => 'Đại lý', 'key' => 'agency'],
            ['name' => 'Khách', 'key' => 'guest'],
        );

        DB::table('user_groups')->insert($data);


    }

}
