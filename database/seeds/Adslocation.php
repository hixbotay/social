<?php

use Illuminate\Database\Seeder;

class Adslocation extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = array(
            [
                'name' => 'Hẹn tốc độ 1',
                'code' => 'DATING_ADS_1',
                'parent_id' => 0,
                'price' => 300000
            ],
            [
                'name' => 'Hẹn tốc độ 2',
                'code' => 'DATING_ADS_2',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Hẹn tốc độ 3',
                'code' => 'DATING_ADS_3',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Module kết đôi 1',
                'code' => 'COUPLE_ADS_1',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Module kết đôi 2',
                'code' => 'COUPLE_ADS_2',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Trang like cá nhân 1',
                'code' => 'LIKE_YOU_ADS_1',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Trang like cá nhân 2',
                'code' => 'LIKE_YOU_ADS_2',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Trang like cá nhân 3',
                'code' => 'LIKE_YOU_ADS_3',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Trang cà phê 1',
                'code' => 'CAFE_ADS_1',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Trang cà phê 2',
                'code' => 'CAFE_ADS_2',
                'parent_id' => 0,
                'price' => 200000
            ],
            [
                'name' => 'Trang cà phê 3',
                'code' => 'CAFE_ADS_3',
                'parent_id' => 0,
                'price' => 200000
            ],

        );
        DB::table('ads_location')->insert($data);
    }
}
