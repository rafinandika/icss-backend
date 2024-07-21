<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Materi;
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

        Materi::create([
            "judul" => "Materi 1",
            "deskripsi" => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed.',
            'file' => 'materi/materi1.pdf',
            'type' => 'pdf'
            ]);
            
          Materi::create([
            "judul" => "Materi 2",
            "deskripsi" => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed.',
            'file' => 'materi/materi2.pdf',
            'type' => 'pdf'
            ]);
            
          Materi::create([
            "judul" => "Materi 3",
            "deskripsi" => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed.',
            'file' => 'materi/materi1.pdf',
            'type' => 'pdf'
            ]);

        \App\Models\Dosen::create([
            'nama' => 'Bogy Restu Ilahi, S.Pd., M.Pd',
            'user_id' => 1,
            'nip' => '2920199202912',
            'foto' => 'dosen/bogy.jpg',
            'tempat_lahir' => 'Bengkulu',
            'tanggal_lahir' => '1991-09-01',
            'menikah' => true,
            'istri' => 'Fina Hiasa M.A',
            'anak' => json_encode([
                "Arsakha Restusa"
            ]),
            'pendidikan' => json_encode([
                [
                    "tingkat" => "S1",
                    "tempat" => "Pendidikan Jasmani FKIP Universitas Bengkulu",
                    "tahun" => null,
                    "deskripsi" => null,
                ],
                [
                    "tingkat" => "S2",
                    "tempat" => "Pendidikan Olahraga Universitas Negeri Jakarta",
                    "tahun" => null,
                    "deskripsi" => null,
                ],
                [
                    "tingkat" => "Kandidat S3",
                    "tempat" => "Doktor Pendidikan Universitas Bengkulu",
                    "tahun" => null,
                    "deskripsi" => "Dalam penyelesaian",
                ]
            ]),
            'deskripsi' => 'Aktif sebagai Dosen di Prodi Penjas FKIP Universitas Bengkulu Sejak 2015-Hingga Saat Ini serta aktif sebagai author & reviewer pada beberapa jurnal ilmiah. Di organisasi keolahragaan diantara nya Ketua Umum Pengprov ABTI Bengkulu, Sekretaris Umum Bapomi Provinsi Bengkulu, Wakil Sekretaris KONI Provinsi Bengkulu sampai saat ini'
        ]);

        \App\Models\Dosen::create([
            'nama' => 'Septian Raibowo, S.Pd., M. Pd',
            'user_id' => 1,
            'nip' => '2920199202912',
            'foto' => 'dosen/septian.jpg',
            'tempat_lahir' => 'Simpang Tiga Rawang',
            'tanggal_lahir' => '1993-09-13',
            'menikah' => true,
            'istri' => 'Miftah Fajrin Rahmi, S.Pd, Gr., M.Pd',
            'anak' => null,
            'pendidikan' => json_encode([
                [
                    "tingkat" => "S1",
                    "tempat" => "Departemen Pendidikan Olahraga Universitas Negeri Padang",
                    "tahun" => 2015,
                    "deskripsi" => null,
                ],
                [
                    "tingkat" => "S2",
                    "tempat" => "Program Pascasarjan Pendidikan Olahraga Universitas Negeri Malang",
                    "tahun" => 2017,
                    "deskripsi" => null,
                ]
            ]),
            'deskripsi' => 'Sejak Tahun 2019 penulis menjadi staf pengajar di Program Studi Pendidikan Jasmani Universitas Bengkulu. Pengalaman lain yang penulis geluti adalah sebagai Wasit Nasional Tenis Lapangan, selain itu aktif dalam berbagai organisasi keolahragaan yaitu sebagai anggota di Bidang Sport Science pada KONI Provinsi Bengkulu, Kabid Pembinaan & Prestasi pada BAPOMI Provinsi Bengkulu, Kabid Perwasitan dan Pertandingan pada PELTI Provinsi Bengkulu. Adapun tugas tambahan yang diamanahkan kepada penulis sejak Tahun 2021-2025 adalah sebagai Koordinator Program Studi Pendidikan Jasmani FKIP Universitas Bengkulu. Penulis juga aktif sebagai author & reviewer pada beberapa jurnal ilmiah'
        ]);
    }
}
