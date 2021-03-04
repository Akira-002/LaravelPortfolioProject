<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserMessageTable extends Migration
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
            $table->integer('sender_id');
            $table->integer('reciver_id');
            // $table->string('title');
            $table->text('description');
            $table->timestamps();

            // `sender_id` field referenced the `id` field of `users` table:
            $table->foreign('sender_id')
            ->references('id')
            ->on('users');

            // this time fot the `reciver_id` field:
            $table->foreign('reciver_id')
            ->references('id')
            ->on('users');
        });

        Schema::create('user_messages', function (Blueprint $table) {
            $table->id();
            $table->integer('sender_id')->unsigned();
            $table->integer('reciver_id')->unsigned();
            $table->integer('message_id')->unsigned();

            // Without it, the cascade doesn't work.
            $table->foreign('sender_id')->references('id')->on('users');
            $table->foreign('reciver_id')->references('id')->on('users');
            $table->foreign('message_id')->references('id')->on('messages');
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('user_messages');
    }
}
