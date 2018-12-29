<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserConfiguration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_configurations', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->boolean('notify_receive_message')->default(1);
            $table->boolean('notify_profile_visited')->default(1);
            $table->boolean('notify_liked')->default(1);
            $table->boolean('notify_loved')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
