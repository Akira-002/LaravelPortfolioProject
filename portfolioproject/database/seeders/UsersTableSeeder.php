<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Message;
use App\Models\User;
use App\Models\Messageable;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $faker = \Faker\Factory::create();
        // Create 10 message records
        for ($i = 0; $i < 15; $i++) {
            User::create([
                'name' => $faker->name(),
                'email' => $faker->unique()->email,
                'password' => $faker->password,
            ]);
        }

        $faker = \Faker\Factory::create();
        // Create 10 message records
        for ($i = 0; $i < 15; $i++) {
            Message::create([
                // 'title' => $faker->sentence($nbWords = 4, $variableNbWords = true),
                'description' => $faker->paragraph,
            ]);
        }

        // $users = User::paginate(3);
        // $messages = Message::paginate(5);
        $messages = Message::paginate(15);
        // Create message_user records
        foreach ($messages as $message) {
            // foreach($users as $user) {
                Messageable::firstOrCreate([
                    'message_id' => $message->id,
                    // 'sender_id' => $faker->numberBetween(1,5),
                    // 'receiver_id' => $faker->numberBetween(6,10),
                    // 'sender_id' => rand(1,7)*2,
                    // 'receiver_id' => rand(1,8)*2-1,
                    'messageable_id' => rand(1, 15),
                    'messageable_type' => rand(0, 1) == 1 ? 'App\Models\User\sendmessage' : 'App\Models\User\receivedmessage',
                ]);
            // }
        }
    }
}
