<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            "name" => "Admin",
            "email" => "admin@gmail.com",
            "username" => "admin",
            "is_admin" => true,
            "is_dosen" => true,
            "aktif" => true,
            "email_verified_at" => now(),
            "foto" => "foto-user/default.png",
            "password" => Hash::make("password"),
        ]);

        User::create([
            "name" => "Rafin Andika",
            "email" => "rafin@gmail.com",
            "username" => "G1F018015",
            "is_admin" => false,
            "is_dosen" => false,
            "aktif" => true,
            "email_verified_at" => now(),
            "foto" => "foto-user/default.png",
            "password" => Hash::make("password"),
        ]);
    }
}
