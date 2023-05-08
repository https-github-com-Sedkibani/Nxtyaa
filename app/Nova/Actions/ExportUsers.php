<?php

namespace App\Nova\Actions;

use Illuminate\Support\Facades\URL;
use Laravel\Nova\Actions\Action;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\LaravelNovaExcel\Actions\DownloadExcel;
use Laravel\Nova\Http\Requests\ActionRequest;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Maatwebsite\Excel\Facades\Excel;

class ExportUsers extends DownloadExcel implements WithMapping
{


  public function handle(ActionRequest $request, Action $exportable): array
  {
    $response = Excel::download(
      $exportable,
      $this->getFilename(),
      $this->getWriterType()
    );

    if (!$response instanceof BinaryFileResponse || $response->isInvalid()) {
      return \is_callable($this->onFailure)
        ? ($this->onFailure)($request, $response)
        : Action::danger(__('Resource could not be exported.'));
    }

    ob_end_clean();
    ob_start();
    return \is_callable($this->onSuccess)
      ? ($this->onSuccess)($request, $response)
      : Action::download(
        $this->getDownloadUrl($response),
        $this->getFilename()
      );
  }

  public function map($user): array
  {
    return [
      $user->name,
      $user->email,
      $user->phone,
      $this->getAge($user->age),
      $this->getZone($user->zone),
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

  protected function getDownloadUrl(BinaryFileResponse $response): string
  {
    return URL::temporarySignedRoute('laravel-nova-excel.download', now()->addMinutes(1), [
      'path'     => encrypt($response->getFile()->getPathname()),
      'filename' => $this->getFilename(),
    ]);
  }
}
