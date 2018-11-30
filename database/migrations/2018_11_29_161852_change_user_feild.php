<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeUserFeild extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function(Blueprint $table) {
            $table->dropColumn("id_card_photos");
            $table->dropColumn("is_id_verified");
            $table->dropColumn("home_town");
            $table->dropColumn("type");
            $table->dropColumn("philosophy");
            $table->dropColumn("ip_address");
            $table->dropColumn("id_number");
            $table->dropColumn("favourite");
            $table->integer("ethnicity")->nullable(1);
            $table->integer("religion")->nullable(1);
            $table->boolean("is_facebook_verified")->default(0);
            $table->boolean("is_gmail_verified")->default(0);
            $table->boolean("is_phone_verified")->default(0);
            $table->string("lifestyle")->default("");
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
