<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAgencyInfo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('agency', function($table) {
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
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
