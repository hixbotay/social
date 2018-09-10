<?php

use Illuminate\Database\Seeder;

class ProvinceGroup extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = array(
            ['name' => 'Nhóm 1', 'province_ids' => json_encode(array(01,24,25,26,27))],
        );

        DB::table('province_groups')->insert($data);
    }
}
