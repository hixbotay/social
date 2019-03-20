<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAgencyIdAgencyCouponsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('agency_coupons', function (Blueprint $table) {
            $table->integer( 'product_id' )->nullable()->change();
            $table->string('dating_type', 255)->nullable()->change();
            $table->string('type', 255)->nullable();
            $table->bigInteger('agency_id')->nullable();
            $table->integer('unit')->nullable()->change();
            $table->text('params')->nullable()->change();
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
