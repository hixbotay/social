<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGifCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gif_categories', function (Blueprint $table) {
            $table->increments('id');
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
        Schema::dropIfExists('gif_categories');
    }
}
