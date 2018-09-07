<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DatingPrice extends Migration
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
            $table->integer('province_group_id');
            $table->float('double_dating_price');
            $table->float('group_dating_m_price');
            $table->float('group_dating_f_price');
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
