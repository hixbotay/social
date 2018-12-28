<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('receiver_id')->nullable(1);
            $table->string('receiver_name', 50)->nullable(1);
            $table->char('order_number');
            $table->float('total');
            $table->float('ship_fee');
            $table->string('order_status', 10)->default(0);
            $table->tinyInteger('payment_status')->default(0);
            $table->integer('coupon_id')->nullable(1);
            $table->string('address1', 225)->nulable(1);
            $table->string('address2', 225)->nulable(1);
            $table->string('cancel_reason', 255);
            $table->text('params')->nullable(1);
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
        Schema::dropIfExists('product_orders');
    }
}
