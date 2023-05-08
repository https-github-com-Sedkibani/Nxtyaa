<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhotosTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('photos', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('user_id');
      $table->string('path');
      $table->string('edited')->nullable();
      $table->enum('status', ['waiting', 'accepted', 'rejected'])->default('waiting');
      $table->enum('product', [
        'X1D1',
        'X1D2',
        'X1D3',
        'X1D4',
        'X2D1',
        'X2D2',
        'X2D3',
        'X2D4',
        'X3D1',
        'X3D2',
        'X3D3',
        'X3D4',
        'X4',
      ]);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('photos');
  }
}
