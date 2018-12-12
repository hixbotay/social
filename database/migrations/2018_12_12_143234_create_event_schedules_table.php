<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventSchedulesTable extends Migration
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
            $table->string('name', 300);
            $table->text('desciption');
            $table->integer('address_id');
            $table->string('schedule_type');
            $table->string('start_time', 5);
            $table->string('start_date', 5);
            $table->tinyInteger('limit_number')->nullable(1);
            $table->integer('min_number')->nullable(1);
            $table->integer('min_m')->nullable(1);
            $table->integer('min_f')->nullable(1);
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
        Schema::dropIfExists('event_schedules');
    }
}
