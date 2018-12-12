<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventSubscribersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_subscribers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->boolean('is_subscribe_couple_dating');
            $table->boolean('is_subscribe_group_dating');
            $table->date('expect_date_from');
            $table->date('expect_date_to');
            $table->string('district_id', 5);
            $table->string('province_id', 5);
            $table->integer('agency_id');
            $table->string('expect_gender', 1);
            $table->integer('expect_age_min');
            $table->integer('expect_age_max');
            $table->integer('expect_job');
            $table->boolean('expect_marital_status');
            $table->string('payer')->default('self');
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
        Schema::dropIfExists('event_subscribers');
    }
}
