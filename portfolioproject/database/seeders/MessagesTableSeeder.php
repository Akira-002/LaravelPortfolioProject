<?php

namespace Database\Seeders;

use App\Models\Message;

use Illuminate\Database\Seeder;

class MessagesTableSeeder extends Seeder
{
    public function run()
    {
        $faker = \Faker\Factory::create();

        // Create 50 product records
        for ($i = 0; $i < 20; $i++) {
            Message::create([
                'title' => $faker->sentence($nbWords = 4, $variableNbWords = true),
                'description' => $faker->paragraph
            ]);
        }
    }
}
