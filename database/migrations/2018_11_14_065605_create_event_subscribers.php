<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventSubscribers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_subscribers', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->boolean('is_subscribe_couple_dating');
            $table->boolean('is_subscribe_group_dating');
            $table->boolean('is_you_pay')->default(1);
            $table->date('expect_date_from');
            $table->date('expect_date_to');
            $table->integer('district_id');
            $table->integer('province_id');
            $table->integer('agency_id');
            $table->string('expect_gender', 1);
            $table->integer('expect_age_min');
            $table->integer('expect_age_max');
            $table->integer('expect_job');
            $table->boolean('expect_marital_status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event_subscribers');
    }
}
