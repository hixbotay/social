<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIdCardVerificationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('id_card_verification', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("user_id");
            $table->string("id_card_front_photo");
            $table->string("id_card_backside_photo");
            $table->string("name");
            $table->string("id_number");
            $table->string("birthday");
            $table->string("date_of_issues");
            $table->boolean("is_verified");
            $table->timestamps();
            $table->unique('user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('id_card_verification');
    }
}
