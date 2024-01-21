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
         Schema::create('speakers',function (Blueprint $table){
            $table->id();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('website');
            $table->string('description');
            $table->string('src');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::dropIfExists('speakers');
    }
};
