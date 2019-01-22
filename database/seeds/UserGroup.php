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
            ['name' => 'Cổ đông', 'key' => config('auth.usergroup.shareholders')],
            ['name' => 'Điều hành chung', 'key' => config('auth.usergroup.general_operation')],
            ['name' => 'Điều hành tỉnh', 'key' => config('auth.usergroup.province_operation')],
            ['name' => 'Điều hành huyện', 'key' => config('auth.usergroup.district_operation')],
            ['name' => 'Thành viên thương hiệu', 'key' => config('auth.usergroup.member_brands')],
            ['name' => 'Thành viên', 'key' => config('auth.usergroup.memeber')],
            ['name' => 'Đại lý', 'key' => config('auth.usergroup.agency')],
            ['name' => 'Nhân viên đại lý', 'key' => config('auth.usergroup.agency_employee')],
            ['name' => 'Khách', 'key' => 'guest'],
        );

        foreach ($data AS $value){
            DB::table('user_groups')->insert($value);

        }

    }

}
