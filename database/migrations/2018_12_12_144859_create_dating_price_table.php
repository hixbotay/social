<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDatingPriceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dating_price', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('type');
            $table->integer('province_group_id');
            $table->float('couple_dating_price');
            $table->float('group_dating_m_price');
            $table->float('group_dating_f_price');
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
        Schema::dropIfExists('dating_price');
    }
}
