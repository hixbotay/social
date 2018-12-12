<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_payments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id')->nullable(0);
            $table->float('total', 10,2)->nullable(0);
            $table->char('currency', 10)->nullable(1);
            $table->char('tx_id',100);
            $table->char('pay_type', 20);
            $table->char('pay_status', 20);
            $table->integer('coupon_id')->nullable(1);
            $table->dateTime('from_time')->nullable(1);
            $table->dateTime('to_time')->nullable(1);
            $table->integer('to_user')->nullable(1);
            $table->integer('ads_id')->nullable(1);
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
        Schema::dropIfExists('user_payments');
    }
}
