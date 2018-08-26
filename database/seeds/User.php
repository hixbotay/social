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

        $data = [
            'name' => "admin",
            'email' =>  "admin@gmail.com",
            'password' => password_hash('123@123a', PASSWORD_BCRYPT),
            'is_admin' => 1,
            'gender' => 'M',
            'mobile' => '01669209256',
            'group_id' => 0,
            'avatar' => 'jfdcnjknskdcsabjc',
            'address' => $faker->streetAddress,
            'longitude' => 23.123667,
            'latitude' => 45.125355,
            'is_verify' => 1,
            'credit' => $faker->randomNumber(),
            'ip_address' => $faker->ipv4,
            'id_number' => 27368712631,
            // 'remember_token' => 'dqfdwugd87273t8hdwkjh3i',
        ];
        print_r($data);
        DB::table('users')->truncate();
        factory(App\User::class)->create($data);
    }
}
