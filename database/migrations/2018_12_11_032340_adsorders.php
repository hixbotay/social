<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Adsorders extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ads_orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->dateTime('from_time');
            $table->dateTime('to_time');
            $table->char('image', 255);
            $table->char('url', 255);
            $table->integer('payment_id');
            $table->tinyInteger('pay_status');
            $table->float('total');
            $table->text('params');
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
        Schema::dropIfExists('ads_orders');
    }
}
