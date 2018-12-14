<?php

use Illuminate\Database\Seeder;

class Hocvan extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('education')->truncate();
        $data = array(
            ['name' => 'Vô học', 'description' => 'ok'],
            ['name' => 'Tiểu học', 'description' => 'ok' ],
            ['name' => 'Cấp 2', 'description' => 'ok'],
            ['name' => 'Cấp 3', 'description' => 'ok'],
            ['name' => 'Đại học', 'description' => 'ok'],
            ['name' => 'Giáo sư', 'description' => 'ok'],
        );
        DB::table('education')->insert($data);
    }
}
