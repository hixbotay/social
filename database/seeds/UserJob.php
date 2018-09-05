<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserJob extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $result = DB::table('user_jobs')->insert([
            'name' => 'Bác sĩ',
            'description' => 'Nghề bác sĩ là nghề chưa bệnh',
        ]);

    }
}
