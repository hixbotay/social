<?php

use Illuminate\Database\Seeder;

class Education extends Seeder
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
            ['name' => 'Vô học'],
            ['name' => 'Tiểu học' ],
            ['name' => 'Cấp 2'],
            ['name' => 'Cấp 3'],
            ['name' => 'Đại học'],
            ['name' => 'Giáo sư'],
        );
        DB::table('education')->insert($data);
    }
}
