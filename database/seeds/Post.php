<?php

use Illuminate\Database\Seeder;

class Post extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        DB::table('posts')->truncate();
        // post
        $post_data = [];
        for($i=0; $i<15; $i++) {
            $post = [
                'user_id' => $faker->randomDigit,
                'content' => $faker->paragraph($nbSentences = 3, $variableNbSentences = true)
            ];
            array_push($post_data, $post);
        }
        DB::table('posts')->insert($post_data);

        // photo
        $photo_data = [];
        for($i=0; $i<8; $i++) {
            $photo = [
                'user_id' => $faker->randomDigit,
                'source' => $faker->imageUrl($width='640', $height='480')
            ];
            array_push($photo_data, $photo);
        }
        DB::table('user_photos')->insert($photo_data);

        // relationship
        $post_photo_data = [];
        for($i=0; $i<8; $i++) {
            $photo_relationship = [
                'post_id' => $faker->randomDigit,
                'photo_id' => $faker->randomDigit
            ];
            array_push($post_photo_data, $photo_relationship);
        }
        DB::table('post_photos')->insert($post_photo_data);
    }
}
