<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dosens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->references('id')->on('users')
                ->onDelete('cascade')->onUpdate('cascade');
            $table->string('nama');
            $table->string('nip');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->boolean('menikah')->default(false);
            $table->string('istri')->nullable();
            $table->string('foto')->nullable();
            $table->json('anak')->nullable();
            $table->json('pendidikan');
            $table->text('deskripsi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dosens');
    }
};
