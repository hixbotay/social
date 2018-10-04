<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        $this->call(User::class);
        $this->call(UserGroup::class);
        $this->call(UserHobby::class);
        $this->call(UserJob::class);
        // $this->call(ProvinceGroup::class);
        $this->call(Post::class);
        $this->call(Events::class);
        Model::reguard();
    }
}
