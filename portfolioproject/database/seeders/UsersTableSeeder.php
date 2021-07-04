<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
// use Illuminate\Support\Str;
use App\Models\Message;
use App\Models\User;

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
                // 'remember_token' => Str::random(100),
            ]);
        }

        $faker = \Faker\Factory::create();
        // Create 10 message records
        for ($i = 0; $i < 15; $i++) {
            Message::firstOrCreate([
                'description' => $faker->paragraph,
                'sender_id' => rand(1,7)*2,
                'receiver_id' => rand(1,8)*2-1,
            ]);
        }
    }
}
