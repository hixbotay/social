<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class User extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        DB::table('users')->truncate();

        $admin = [
            'name' => "admin",
            'email' =>  "admin@gmail.com",
            'password' => password_hash('123@123a', PASSWORD_BCRYPT),
            'is_admin' => 1,
            'gender' => 'M',
            'mobile' => '01669209256',
            'group_id' => 0,
            'address' => $faker->streetAddress,
            'longitude' => 23.123667,
            'latitude' => 45.125355,
            'is_verify' => 1,
            'credit' => $faker->randomNumber($nbDigits = NULL, $strict = false),
            'ip_address' => $faker->ipv4,
            'id_number' => $faker->isbn13,
            'avatar' => $faker->imageUrl($width='200', $height='300'),
        ];

        factory(App\User::class)->create($admin);

        for($i=0; $i<10; $i++) {
            $user = [
                'name' => $faker->name,
                'email' =>  $faker->email,
                'password' => password_hash('123@123a', PASSWORD_BCRYPT),
                'is_admin' => 0,
                'gender' => $faker->randomElement(['M', 'F']),
                'mobile' => $faker->e164PhoneNumber,
                'group_id' => $faker->randomDigit,
                'avatar' => $faker->imageUrl($width='200', $height='300'),
                'address' => $faker->streetAddress,
                'longitude' => $faker->longitude($min=100, $max=110),
                'latitude' => $faker->latitude($min = 0, $max = 25),
                'is_verify' => $faker->randomElement([0, 1]),
                'credit' => $faker->randomNumber($nbDigits = NULL, $strict = false),
                'ip_address' => $faker->ipv4,
                'id_number' => $faker->isbn13, //(?)
                'weight' => $faker->randomFloat($nbMaxDecimal = 2, $min = 50, $max=100),
                'height' => $faker->randomFloat($nbMaxDecimal = 2, $min = 150, $max=200),
                'marital_status' => $faker->randomElement([0, 1]),
                'education' => $faker->numberBetween($min = 1, $max = 20),
                'job' => $faker->numberBetween($min = 1, $max = 20),
                'favourite' => $faker->sentence($nbWords = 6, $variableNbWords = true),
                'philosophy' => $faker->text($maxNbChars = 200),
                'birthday' => $faker->date($format = 'Y-m-d', $max = 'now'),
                'type' =>  $faker->text($maxNbChars = 200),
                'home_town' =>  $faker->text($maxNbChars = 200)
            ];
            factory(App\User::class)->create($user);
        }
        // print_r($data);
    }
}
