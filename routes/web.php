<?php

use App\Http\Controllers\AuthController;
use App\Models\Photo;
use App\Models\User;
use App\Nova\Actions\PhotosExportHelper;
use App\Nova\Actions\UsersExport;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Route;
use Intervention\Image\Facades\Image;
use Maatwebsite\Excel\Facades\Excel;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('{any}', function () {
//   return view('welcome');
// })->where('any', '.*');

Route::get('auth/facebook', [AuthController::class, 'facebookRedirect']);
Route::get('auth/facebook/callback', [AuthController::class, 'loginWithFacebook']);


Route::get('download-photos', function () {
  $zip = new ZipArchive();
  $fileName = 'files.zip';

  $users = User::whereHas('photos', function (Builder $query) {
    $query->where('status', '=', 'accepted');
  })->get();

  if ($zip->open(public_path($fileName), ZipArchive::CREATE | ZipArchive::OVERWRITE) == TRUE) {
    foreach ($users as $user) {
      $photos  = $user->photos;
      foreach ($photos as $photo) {
        if (!empty($photo->path)) {
          $path = public_path('storage/' . $photo['path']);
          $relative_name = basename($path);
          $zip->addFile($path, $relative_name);
          // $zip->addFile($path, "design files/" . $relative_name);
        }
      }
    }
    $zip->close();
  }


  if (file_exists(public_path($fileName))) {
    return response()->download(public_path($fileName))->deleteFileAfterSend(true);
  } else {
    echo "<script>window.close();</script>";
  }
});



Route::get('/{any}', function () {
  return view('welcome');
})->where('any', '^(?!nova).*$');
