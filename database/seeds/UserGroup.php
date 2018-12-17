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
        DB::table('user_groups')->truncate();

        $data = array(
            [
                'name' => 'administrator',
                'key' => 'administrator',
                'role' => json_encode(config('auth.action'))
            ],
            ['name' => 'Cổ đông', 'key' => 'shareholders'],
            ['name' => 'Điều hành chung', 'key' => 'general_operation'],
            ['name' => 'Điều hành tỉnh', 'key' => 'province_operation'],
            ['name' => 'Điều hành huyện', 'key' => 'district_operation'],
            ['name' => 'Thành viên thương hiệu', 'key' => 'member_brands'],
            ['name' => 'Thành viên', 'key' => 'memeber'],
            ['name' => 'Đại lý', 'key' => 'agency'],
            ['name' => 'Nhân viên đại lý', 'key' => 'agency_manager'],
//            ['name' => 'Đại lý quán ăn', 'key' => 'agency_food', 'parent_id' => 6],
//            ['name' => 'Đại lý quà tặng', 'key' => 'agency_gif', 'parent_id' => 6],
//            ['name' => 'Đại lý quán cafe', 'key' => 'agency_cafe', 'parent_id' => 6],
            ['name' => 'Khách', 'key' => 'guest'],
        );

        foreach ($data AS $value){
            DB::table('user_groups')->insert($value);

        }

    }

}
