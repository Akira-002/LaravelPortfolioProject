<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFollowrelationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('follow_relations', function (Blueprint $table) {
            $table->id();
            $table->integer('followed_user_id')->unsigned();
            $table->integer('following_user_id')->unsigned();
            $table->timestamps();

            // The cascade: `sender_id` and `receiver_id`field referenced the `id` field of `users` table:
            $table->foreign('followed_user_id')->references('id')->on('users');
            $table->foreign('following_user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('follow_relations');
    }
}
