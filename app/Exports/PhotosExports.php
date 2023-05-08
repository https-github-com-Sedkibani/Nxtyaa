<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\LaravelNovaExcel\Actions\DownloadExcel;

class PhotosExports extends DownloadExcel
{

  public function map($photo): array
  {
    return [
      $photo->id,
      $photo->status,
      $photo->phone,
      $photo->user ? $photo->user->name : "",
      $photo->user ? $photo->user->zone : "",
      "https://gilicegenerations.com/storage/" . $photo->path,
      "https://gilicegenerations.com/storage/" . $photo->edited,
    ];
  }
}
