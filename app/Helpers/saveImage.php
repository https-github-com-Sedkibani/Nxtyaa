
<?php

use Illuminate\Support\Facades\Storage;

function saveImage($image, $path, $disk = "public")
{
  $extension = $image->extension();
  $name = sha1(\Carbon\Carbon::now());
  $image->storeAs('/' . $disk . '/' . $path, $name . "." . $extension);
  $image_url = $path . "" . $name . "." . $extension;
  Storage::url($image_url);
  return $image_url;
}
