<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserRelationshipTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_relationship', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('from_user_id');
            $table->integer('to_user_id');
            $table->boolean('is_like')->default(0);
            $table->boolean('is_friend')->default(0);
            $table->boolean('is_follow')->default(0);
            $table->boolean('is_block')->default(0);
            $table->boolean('is_loved')->default(0);
            $table->boolean('friend_status')->default(0);
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
        Schema::dropIfExists('user_relationship');
    }
}
