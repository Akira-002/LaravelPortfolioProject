<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Message;
use App\Models\User;
use App\Models\UserMessage;


class UsersMessagesTableSeeder extends Seeder
{
    public function run()
    {
        $faker = \Faker\Factory::create();
        // Create 10 message records
        for ($i = 0; $i < 10; $i++) {
            User::create([
                'name' => $faker->name(),
                'email' => $faker->unique()->email,
                'password' => $faker->password,
            ]);
        }

        $faker = \Faker\Factory::create();
        // Create 10 message records
        for ($i = 0; $i < 10; $i++) {
            Message::create([
                // 'title' => $faker->sentence($nbWords = 4, $variableNbWords = true),
                'description' => $faker->paragraph
            ]);
        }

        $users = User::paginate(3);
        $messages = Message::paginate(3);
        // Create user_message records
        foreach ($messages as $message) {
            foreach($users as $user) {
                UserMessage::firstOrCreate([
                    'message_id' => $message->id,
                    'sender_id' => $user->id,
                    'receiver_id' => $user->id,
                ]);
            }
        }
    }
}
