<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name',300);
            $table->integer('schedule_id');
            $table->tinyInteger('limit_number');
            $table->integer('min_number');
            $table->dateTime('limit_time_register');
            $table->dateTime('start_time');
            $table->decimal('payment_m', 15, 2);
            $table->decimal('payment_f', 15, 2);
            $table->string('image')->nullable(1);
            $table->string('type');
            $table->integer('creator');
            $table->integer('agency_id');
            $table->boolean('is_approved');
            $table->string('status');
            $table->boolean('is_secret')->default(0);
            $table->boolean('description')->nullable(1);
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
        Schema::dropIfExists('events');
    }
}
