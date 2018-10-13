<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddEventInfo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('events', function($table) {
            $table->integer('creator');
            $table->integer('agency_id');
            if (Schema::hasColumn('events', 'address_id')) {
                $table->dropColumn('address_id');
            }
            $table->dropColumn('address');
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
