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
			$table->string('gender',1)->nullable(1);
			$table->string('mobile',20)->nullable(1)->unique();
			$table->string('avatar',300)->nullable(1);
			$table->integer('group_id')->nullable(1);
			$table->string('address',200)->nullable(1);
			$table->decimal('longitude',9,6)->nullable(1);
			$table->decimal('latitude',9,6)->nullable(1);
			$table->boolean('is_verify')->nullable(1);
			$table->integer('credit')->nullable(1);
			$table->string('ip_address',30)->nullable(1);
			$table->string('id_number',20)->nullable(1);
			$table->float('weight')->nullable(1);
			$table->float('height')->nullable(1);
			$table->tinyInteger('marital_status')->nullable(1);
			$table->tinyInteger('education')->nullable(1);
			$table->tinyInteger('job')->nullable(1);
			$table->text('favourite')->nullable(1);
			$table->string('philosophy', 1000)->nullable(1);
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
			$table->drop('latitude');
			$table->drop('is_verify');
			$table->drop('credit');
			$table->drop('ip_address');
			$table->drop('id_number');
		});
    }
}
