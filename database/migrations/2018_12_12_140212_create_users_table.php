<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->nullable(1)->unique();
            $table->string('password');
            $table->boolean('is_admin')->default(0);
            $table->string('gender',1)->nullable(1);
            $table->string('mobile',20)->nullable(1)->unique();
            $table->string('avatar',300)->default('/storage/app/public/default.jpg');
            $table->integer('group_id')->nullable(0);
            $table->string('address',200)->nullable(1);
            $table->decimal('longitude',9,6)->nullable(1);
            $table->decimal('latitude',9,6)->nullable(1);
            $table->boolean('is_verify')->nullable(1);
            $table->integer('credit')->nullable(1);
            $table->float('weight')->nullable(1);
            $table->float('height')->nullable(1);
            $table->tinyInteger('marital_status')->nullable(1);
            $table->tinyInteger('education')->nullable(1);
            $table->tinyInteger('job')->nullable(1);
            $table->date('birthday')->nullable(1);
            $table->string('province_id', 5)->nullable(1);
            $table->string('district_id', 5)->nullable(1);
            $table->string('village_id', 5)->nullable(1);
            $table->string('provider')->nullable(1);
            $table->string('provider_id')->nullable(1);
            $table->string('ideal_person')->default("");
            $table->string('dismiss_users')->default("");
            $table->string('is_blocked')->default(0);
            $table->integer("ethnicity")->nullable(1);
            $table->integer("religion")->nullable(1);
            $table->boolean("is_facebook_verified")->default(0);
            $table->boolean("is_gmail_verified")->default(0);
            $table->boolean("is_phone_verified")->default(0);
            $table->string("lifestyle")->default("");
            $table->string('description')->nullable();
            $table->rememberToken();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
