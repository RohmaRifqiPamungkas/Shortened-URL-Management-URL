<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ShortenedLinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Mengambil ID user yang sudah ada (misalnya user dengan ID 1)
        $userId = 1;

        // Insert data dummy untuk shortened_links
        DB::table('shortened_links')->insert([
            [
                'user_id' => $userId,
                'original_url' => 'https://example.com',
                'short_code' => Str::random(6), // Atau bisa custom sesuai kebutuhan
                'custom_alias' => 'exmpl',
                'expires_at' => Carbon::now()->addDays(7), // Link akan kadaluarsa dalam 7 hari
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $userId,
                'original_url' => 'https://laravel.com',
                'short_code' => Str::random(6),
                'custom_alias' => 'laravel',
                'expires_at' => Carbon::now()->addDays(14), // Link akan kadaluarsa dalam 14 hari
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $userId,
                'original_url' => 'https://github.com',
                'short_code' => Str::random(6),
                'custom_alias' => null, // Tanpa custom alias, short_code yang dihasilkan random
                'expires_at' => null, // Tidak ada tanggal kadaluarsa
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}