<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EventSchedules extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_schedules', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('name', 300);
            $table->text('desciption');
            $table->integer('address_id');
            $table->char('schedule_type');
            $table->char('start_time', 5);
            $table->char('start_date', 5);
            $table->tinyInteger('limit_number', 1)->nullable(1);
            $table->integer('min_number')->nullable(1);
            $table->integer('min_m')->nullable(1);
            $table->integer('min_f')->nullable(1);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event_schedules');
    }
}
