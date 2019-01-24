<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBoitoanNguHanhsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('boitoan_ngu_hanh', function (Blueprint $table) {
            $table->tinyInteger('point');
            $table->char('description',5000);
            $table->timestamps();
        });

        $array = [];
        for($i=0;$i<=10;$i++){
            $array[] = ['point'=>$i,'description'=>''];
        }
        DB::table('boitoan_ngu_hanh')->insert($array);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('boitoan_ngu_hanh');
    }
}
