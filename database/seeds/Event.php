<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Events extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        DB::table('events')->truncate();
        DB::table('event_meta')->truncate();
        $event_data = [];
        $meta_data = [];
        for($i=0; $i<20; $i++) {
            $event = [
                'name' =>  $faker->realText($maxNbChars = 20, $indexSize = 2),
                'schedule_id' => $faker->randomDigit,
                'description' => $faker->paragraph($nbSentences = 2, $variableNbSentences = true),
                'created' => date("Y/m/d"),
                'address' => $faker->sentence($nbWords = 3, $variableNbWords = true) ,
                'address_id' => $faker->randomDigit,
                'limit_number' => $faker->randomNumber($nbDigits = 2, $strict = false),
                'min_number' => $faker->randomDigit,
                'min_m' => $faker->randomDigit,
                'min_f' => $faker->randomDigit,
                'limit_time_register' => new DateTime('tomorrow'),
                'start_time' => date("Y/m/d"),
                'payment_m' => '100000.00',
                'payment_f' => '100000.00',
                'params' =>  $faker->sentence($nbWords = 6, $variableNbWords = true) ,
                'image' => $faker->imageUrl($width='400', $height='600'),
                'type' => $faker->randomElement(['couple', 'group'])
            ];
            array_push($event_data, $event);
        }

        for($i=1; $i<=40; $i++) {
            $meta = [
                'event_id' => $faker->randomElement([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]),
                'meta_key' => 'job_conditional',
                'meta_value' => $faker->randomDigit,
            ];
            array_push($meta_data, $meta);
        }

        for($i=1; $i<=20; $i++) {
            $meta1 = [
                'event_id' => $i,
                'meta_key' => 'marital_status',
                'meta_value' => $faker->randomElement([0,1]),
            ];

            $meta2 = [
                'event_id' => $i,
                'meta_key' => 'min_male_age',
                'meta_value' => $faker->randomNumber($nbDigits = 2, $strict = false),
            ];

            $meta3 = [
                'event_id' => $i,
                'meta_key' => 'min_female_age',
                'meta_value' => $faker->randomNumber($nbDigits = 2, $strict = false),
            ];

            $meta4 = [
                'event_id' => $i,
                'meta_key' => 'max_male_age',
                'meta_value' => $faker->randomNumber($nbDigits = 2, $strict = false),
            ];

            $meta5 = [
                'event_id' => $i,
                'meta_key' => 'max_female_age',
                'meta_value' => $faker->randomNumber($nbDigits = 2, $strict = false),
            ];

            $meta6 = [
                'event_id' => $i,
                'meta_key' => 'min_male_number',
                'meta_value' => $faker->randomNumber($nbDigits = 2, $strict = false),
            ];

            $meta7 = [
                'event_id' => $i,
                'meta_key' => 'max_male_number',
                'meta_value' => $faker->randomNumber($nbDigits = 2, $strict = false),
            ];

            $meta8 = [
                'event_id' => $i,
                'meta_key' => 'min_female_number',
                'meta_value' => $faker->randomNumber($nbDigits = 2, $strict = false),
            ];

            $meta9 = [
                'event_id' => $i,
                'meta_key' => 'max_female_number',
                'meta_value' => $faker->randomNumber($nbDigits = 2, $strict = false),
            ];

            array_push($meta_data, $meta1, $meta2, $meta3, $meta4, $meta5, $meta6, $meta7, $meta8, $meta9);
        }

        DB::table('events')->insert($event_data);
        DB::table('event_meta')->insert($meta_data);
    }
}
