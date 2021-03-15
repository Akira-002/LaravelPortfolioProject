<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            // $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            // $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            // $table->string('title');
            $table->text('description');
            $table->timestamps();
        });

        // Schema::create('message_user', function (Blueprint $table) {
        //     $table->id();
        //     $table->integer('message_id')->unsigned();
        //     $table->integer('sender_id')->unsigned();
        //     $table->integer('receiver_id')->unsigned();

        //     // Without it, the cascade doesn't work.
        //     $table->foreign('message_id')->references('id')->on('messages');

        //     // `sender_id` field referenced the `id` field of `users` table:
        //     // this time fot the `receiver_id` field:
        //     $table->foreign('sender_id')->references('id')->on('users');
        //     $table->foreign('receiver_id')->references('id')->on('users');
        // });

        Schema::create('messageables', function (Blueprint $table) {
            // $table->id();
            $table->integer('message_id')->unsigned();
            // $table->integer('sender_id')->unsigned();
            // $table->integer('receiver_id')->unsigned();

            // Without it, the cascade doesn't work.
            $table->foreign('message_id')->references('id')->on('messages');

            // `sender_id` field referenced the `id` field of `users` table:
            // this time fot the `receiver_id` field:
            // $table->foreign('sender_id')->references('id')->on('users');
            // $table->foreign('receiver_id')->references('id')->on('users');
            // make messageable_id and messageable_type
            $table->morphs('messageable');
        });

    }

    public function down()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('messageables');
    }
}
