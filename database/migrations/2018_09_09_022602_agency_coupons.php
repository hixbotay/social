<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AgencyCoupons extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agency_coupons', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('from_time');
            $table->dateTime('to_time');
            $table->integer('product_id');
            $table->integer('dating_type');
            $table->float('value');
            $table->tinyInteger('unit');
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
        Schema::dropIfExists('agency_coupons');
    }
}
