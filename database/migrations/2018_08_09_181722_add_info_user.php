<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddInfoUser extends Migration
{
    /**
     * Run the migrations.
     *Them thong tin user
     * @return void
     */
    public function up()
    {
        Schema::table('users', function($table) {
			$table->string('gender',1)->nullable(0);
			$table->string('mobile',20)->nullable(0);
			$table->string('avatar',300)->nullable(0);
			$table->integer('group_id')->nullable(0);
			$table->string('address',200)->nullable(0);
			$table->float('longitude',6,6)->nullable(0);
			$table->float('langitude',6,6)->nullable(0);
			$table->boolean('is_verify')->nullable(0);
			$table->integer('credit')->nullable(0);
			$table->string('ip_address',30)->nullable(0);
			$table->string('id_number',20)->nullable(0);
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function($table) {
			$table->drop('gender');
			$table->drop('mobile');
			$table->drop('avatar');
			$table->drop('group_id');
			$table->drop('address');
			$table->drop('longitude');
			$table->drop('langitude');
			$table->drop('is_verify');
			$table->drop('credit');
			$table->drop('ip_address');
			$table->drop('id_number');
		});
    }
}
