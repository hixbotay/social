<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserPayments extends Migration
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
            $table->float('total')->nullable(0);
            $table->char('tx_id',100);
            $table->char('pay_type', 20);
            $table->char('pay_status', 20);
            $table->text('params');
            $table->dateTime('created');
//            $table->timestamps();
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
