<?php

namespace App\Nova\Actions;

use App\Models\Photo;
use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMapping;

class PhotosExportHelper implements FromCollection, WithMapping
{
  public function collection()
  {
    return Photo::all();
  }

  public function map($photo): array
  {
    return [
      $photo->status,
      $this->getZone($photo->zone),
      "https://kaffiwaffi.com/storage/" . "" . $photo->path,
      !empty($photo->user) ? $photo->user->name : "",
      !empty($photo->user) ? $photo->user->phone : "",
      !empty($photo->user) ? $photo->user->email : "",
    ];
  }


  public function getZone($zone)
  {
    if ($zone === "zone_1") return "طرابلس والمنطقة الغربية";
    if ($zone === "zone_2") return "مصراته والمنطقة الوسطى";
    if ($zone === "zone_3") return "بنغازي والمنطقة الشرقية";
    if ($zone === "zone_4") return "سبها والمنطقة الجنوبية";
    return "";
  }

  public function getAge($age)
  {
    if ($age === "10_20") return "10-20 سنة";
    if ($age === "20_30") return "20- 30 سنة";
    if ($age === "30_40") return "30- 40 سنة";
    if ($age === "40+") return "40+ سنة";
    return "";
  }
}
