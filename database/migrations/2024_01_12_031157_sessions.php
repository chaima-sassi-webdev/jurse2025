<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up(): void
    {
        Schema::create('sessions',function (Blueprint $table){
            $table->id();
            $table->string('title');
            $table->string('order');
            $table->string('description');
            $table->unsignedBigInteger('author_id');

            // Creating the foreign key relationship
            $table->foreign('author_id')->references('id')->on('authors')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
         Schema::dropIfExists('sessions');
    }
};
