<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FollowRelation;


class FollowRelationSeeder extends Seeder
{
    public function run()
    {
        $faker = \Faker\Factory::create();
        // Create 10 followrelation records
        for ($i = 0; $i < 100; $i++) {
            FollowRelation::firstOrCreate([
                'followed_user_id' => rand(11,19),
                'following_user_id' => rand(11,19)
            ]);
        }
    }
}
