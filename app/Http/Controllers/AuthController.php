<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConnectRequest;
use App\Models\Photo;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
  public function connect(ConnectRequest $request)
  {
    $data = $request->all();

    $user = User::where('email', '=', $data["email"])
      ->orWhere('facebook_id', '=', $data["facebook_id"])
      ->first();

    if (empty($user)) {
      $user = User::create($data);
    }
    $token = $user->createToken($data['name'])->plainTextToken;
    $success['token'] = $token;
    $success['user'] = $user;

    return response()->json($success);
  }

  public function getUser(Request $request)
  {
    return response()->json($request->user());
  }

  public function savePhoto(Request $request)
  {
    $user = $request->user();
    $data = $request->all();
    if ($request->hasFile('photo') && array_key_exists('product', $data)) {
      $photoPath = env("VOLUME_NAME") . "/users/" . $user->id . "/";
      $finalPath =   saveImage($request->photo, $photoPath);

      // resize images
      $currentImg = Image::make(storage_path("app/public/" . $finalPath));
      $currentImg->resize(400, null, function ($constraint) {
        $constraint->aspectRatio();
      });
      $currentImg->save();

      $photo = Photo::create([
        'user_id' => $user->id,
        'path' => $finalPath,
        'product' => $data["product"],
      ]);
      return response()->json($photo);
    }
    return response()->json("Error", 400);
  }

  public function getPhotos(Request $request)
  {
    $ordred = $request->query('ordred');
    $photos = $request->query('photos');
    $user = $request->user('sanctum');

    $photos = Photo::where('status', 'accepted')
      ->when($photos, function ($query) use ($photos, $user) {
        if (!empty($user)) {
          if ($photos === "mine") {
            $query->where("user_id", "=", $user->id);
          }
        }
      })
      ->when($ordred, function ($query) {
        $query->orderBy('created_at', 'desc');
      })->paginate(6);
    return response()->json($photos);
  }

  public function getParticipationsNumber()
  {
    return response()->json(Photo::where('status', 'accepted')->count());
  }

  public function checkAccount($fbId)
  {
    $user = User::where('facebook_id', '=', $fbId)->first();
    if (empty($user)) {
      return response()->json("", 401);
    }

    $token = $user->createToken($user->name)->plainTextToken;
    $success['token'] = $token;
    $success['user'] = $user;
    return  response()->json($success);
  }

  public function export()
  {
  }


  public function facebookRedirect()
  {
    return Socialite::driver('facebook')->redirect();
  }

  public function loginWithFacebook()
  {
    try {
      $user = Socialite::driver('facebook')->user();
      $email = $user->email ? $user->email : "facebook@" . $user->id . "com";
      return redirect('/?name=' . $user->name . "&email=" . $email . "&id=" . $user->id . "&avatar=" . $user->avatar);
    } catch (Exception $exception) {
      return redirect('/');
    }
  }

  public function submitAnswers(Request $request)
  {
    $request->validate([
      "question-1" => 'required',
      "question-2" => 'required',
      "question-3" => 'required',
      "question-4" => 'required',
    ]);

    $data = $request->all();
    $user = $request->user();

    $answerOne = $data["question-1"];
    $answerTwo = $data["question-2"];
    $answerThree = $data["question-3"];
    $taste = $data["question-4"];

    $allAnswers = $answerOne . "" . $answerTwo . "" . $answerThree;
    // Product to put on the image
    $producAnsweredtImageName = null;

    if ($this->getHighest($allAnswers)) {
      $producAnsweredtImageName = "X" . $this->getHighest($allAnswers);
    } else {
      $producAnsweredtImageName = null;
    }

    // Getting product with Taste ( last answer )
    $productAnsweredWithTaste = null;

    if ($producAnsweredtImageName) {
      $productAnsweredWithTaste = $producAnsweredtImageName . "" . $taste;
    }
    // Getting last photo for the user
    $lastUserPhoto = $user->photos()->orderBy('created_at', 'DESC')->first();
    $userProductChoice = $lastUserPhoto->product;
    $editedPhotoPath = env("VOLUME_NAME") . "/users/" . $user->id . "/" . sha1(\Carbon\Carbon::now()) . ".jpg";
    $bgGame = Image::make(public_path("images/_BG.png"));
    $logoArab = Image::make(public_path("images/logo-arab.png"));
    $avatar = Image::make(file_get_contents($user->avatar));
    $avatar->mask(public_path("images/circle.png"));
    $avatar->mask(public_path("images/circle.png"), true);
    $avatar->resize(80, null, function ($constraint) {
      $constraint->aspectRatio();
    });

    if ($productAnsweredWithTaste && $userProductChoice === $productAnsweredWithTaste) {
      // Scenario 2
      $productToPutOn = Image::make(public_path("images/products/" . $productAnsweredWithTaste . ".png"))->rotate(5);
      $bgGame->insert($this->getCanvas("2"), 'top-right');
      if (in_array($productAnsweredWithTaste, ["X2D1", "X2D2", "X2D3", "X2D4", "X3D1", "X3D2", "X3D3", "X3D4", "X4"])) {
        $bgGame->insert($productToPutOn, 'left', 120);
      } else {
        $bgGame->insert($productToPutOn, 'left', 100);
      }
      $bgGame->insert($avatar, 'left', 20);
      $bgGame->insert($logoArab->resize(null, 80, function ($constraint) {
        $constraint->aspectRatio();
      }), 'bottom-left');
      $bgGame->save(public_path() . "/storage/" . $editedPhotoPath);
    } elseif ($productAnsweredWithTaste && $userProductChoice !== $productAnsweredWithTaste) {
      // Scenario 1
      $productToPutOn = Image::make(public_path("images/products/" . $productAnsweredWithTaste . ".png"))->rotate(5);
      if (in_array($productAnsweredWithTaste, ["X2D1", "X2D2", "X2D3", "X2D4", "X3D1", "X3D2", "X3D3", "X3D4", "X4"])) {
        $bgGame->insert($productToPutOn, 'left', 120);
      } else {
        $bgGame->insert($productToPutOn, 'left', 100);
      }
      $bgGame->insert($this->getCanvas("1"), 'top-right');
      $bgGame->insert($logoArab->resize(null, 80, function ($constraint) {
        $constraint->aspectRatio();
      }), 'bottom-left');
      $bgGame->insert($avatar, 'left', 20);
      $bgGame->save(public_path() . "/storage/" . $editedPhotoPath);
    } else {
      // Scenario 3
      $productToPutOn = Image::make(public_path("images/products/X4.png"))->rotate(5);
      $bgGame->insert($productToPutOn, 'left', 120);
      $bgGame->insert($this->getCanvas("3"), 'top-right');
      $bgGame->insert($logoArab->resize(null, 80, function ($constraint) {
        $constraint->aspectRatio();
      }), 'bottom-left');
      $bgGame->insert($avatar, 'left', 20);
      $bgGame->save(public_path() . "/storage/" . $editedPhotoPath);
    }
    $lastUserPhoto->update([
      "edited" => $editedPhotoPath,
    ]);
    return response()->json($lastUserPhoto);
  }

  function getHighest($str)
  {
    $str = str_replace(' ', '', $str);
    $arr = str_split(count_chars($str . trim($str), 3));
    $hStr = "";
    $occ = 0;

    foreach ($arr as $value) {
      $oc = substr_count($str, $value);
      if ($occ < $oc) {
        $hStr = $value;
        $occ = $oc;
      }
    }
    if ($occ < 2) {
      return null;
    }
    return $hStr;
  }

  public function getCanvas($scenario)
  {
    $txtsc = null;
    if ($scenario === "1") {
      $txtsc = Image::make(public_path("images/txtsc1.png"));
    } elseif ($scenario === "2") {
      $txtsc = Image::make(public_path("images/txtsc2.png"));
    } else {
      $txtsc = Image::make(public_path("images/txtsc3.png"));
    }
    $img = Image::canvas(300, 338);
    $img->insert($txtsc->resize(null, 338, function ($constraint) {
      $constraint->aspectRatio();
    }), 'center');
    return $img;
  }
}
