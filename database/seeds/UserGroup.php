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
            ['name' => 'administrator', 'key' => 1],
            ['name' => 'Cổ đông', 'key' => 2],
            ['name' => 'Điều hành chung', 'key' => 3],
            ['name' => 'Điều hành tỉnh', 'key' => 4],
            ['name' => 'Điều hành huyện', 'key' => 5],
            ['name' => 'Thành viên thương hiệu', 'key' => 6],
            ['name' => 'Thành viên đặc biệt', 'key' => 7],
            ['name' => 'Thành viên đảm bảo', 'key' => 8],
            ['name' => 'Thành viên vip', 'key' => 9],
            ['name' => 'Thành viên chính thức', 'key' => 10],
            ['name' => 'Thành viên tạm thời', 'key' => 11],
            ['name' => 'Đại lý', 'key' => 12],
            ['name' => 'Khách', 'key' => 13],
        );

        DB::table('user_groups')->insert($data);


    }

}
