<?php

use Illuminate\Database\Seeder;

class UserJob extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Bác sĩ',
            'description' => 'Nghề bác sĩ là nghề chưa bệnh',
        ],[
            'name' => 'Giáo viên',
            'description' => 'Chuyên dạy học'
        ],[
            'name' => 'Kỹ sư thông tin',
            'description' => 'Mô tả nghề kỹ sư',
        ]);
    }
}
