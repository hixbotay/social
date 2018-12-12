<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGifTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gif', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('category_id');
            $table->float('price');
            $table->float('sale_price');
            $table->float('regular_price');
            $table->string('name', 1000);
            $table->string('image', 2000)->nullable(1);
            $table->text('description')->nullable(1);
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
        Schema::dropIfExists('gif');
    }
}
