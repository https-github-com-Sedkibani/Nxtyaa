<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['user_id', 'path', 'status', 'product', 'edited'];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function getZoneAttribute()
  {
    $user = $this->user;
    if (empty($user)) {
      return "";
    }
    return $this->getZone($user->zone);
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

  public function getPhoneAttribute()
  {
    $user = $this->user;
    if (!empty($user) && !empty($user->phone)) {
      return $user->phone;
    }
    return "";
  }
}
