<?php

use Illuminate\Database\Seeder;

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
        $limit = 10;

        for ($i = 0; $i < $limit; $i++) {
            DB::table('users')->insert([
                'name' => $faker->name,
                'email' => $faker->unique()->email,
                'password' => password_hash(str_random(10), PASSWORD_BCRYPT),
                'is_admin' => 0,
                'gender' => $faker->randomElement(['M', 'F']),
                'mobile' => $faker->e164PhoneNumber(),
                'avatar' => $faker->imageUrl($width = 640, $height = 480),
                'group_id' => $faker->randomDigitNotNull,
                'address' => $faker->streetAddress,
                'longitude' => $faker->numberBetween($min=100, $max=106),
                'langitude' => $faker->numberBetween($min=21, $max=25),
                'is_verify' => $faker->randomElement([0, 1]),
                'credit' => $faker->randomNumber(),
                'ip_address' => $faker->ipv4,
                'id_number' => $faker->uuid
            ]);
        }
    }
}
