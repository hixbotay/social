<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Agency extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agency', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->string('name');
            $table->string('address');
            $table->integer('province_id');
            $table->integer('district_id');
            $table->tinyInteger('authorized_dealer')->nullable(1);
            $table->tinyInteger('contract')->nullable(1);

            $table->string('hotline', 20)->nullable(1);
            $table->integer('village_id')->nullable(1);
            $table->string('email', 200)->nullable(1);
            $table->string('website', 200)->nullable(1);
            $table->float('lat', 16, 16)->nullable(1);
            $table->float('lng', 16, 16)->nullable(1);
            $table->string('owner', 200)->nullable(1);
            $table->string('owner_mobile', 20)->nullable(1);
            $table->string('manager', 200)->nullable(1);
            $table->string('manager_mobile', 20)->nullable(1);
            $table->float('min_price')->nullable(1);
            $table->float('max_price')->nullable(1);
            $table->time('open')->nullable(1);
            $table->time('close')->nullable(1);
            $table->string('type');

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
        Schema::dropIfExists('agency');
    }
}
