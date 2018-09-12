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
        $faker = Faker\Factory::create();
        DB::table('user_jobs')->truncate();

        $data = [];
        for($i = 0; $i < 15; $i++) {
            $item = [
                'name' => $faker->jobTitle,
                'description' => $faker->sentence($nbWords = 6, $variableNbWords = true)
            ];
            array_push($data, $item);
        }
        DB::table('user_jobs')->insert($data);
    }
}
