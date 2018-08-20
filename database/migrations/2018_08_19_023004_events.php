<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Events extends Migration
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
            $table->text('desciption')->nullable(1);
            $table->dateTime('created');
            $table->string('address', 1000);
            $table->integer('address_id');
            $table->tinyInteger('limit_number');
            $table->integer('min_number');
            $table->integer('min_m');
            $table->integer('min_f');
            $table->dateTime('limit_time_register');
            $table->dateTime('start_time');
            $table->decimal('payment_m', 15, 2);
            $table->decimal('payment_f', 15, 2);
            $table->text('params');

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
