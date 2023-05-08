<?php

namespace App\Nova\Actions;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Collection;
use Laravel\Nova\Actions\Action;
use Laravel\Nova\Fields\ActionFields;
use Maatwebsite\Excel\Facades\Excel;

class DownloadPhotosExcel extends Action
{
  use InteractsWithQueue, Queueable;

  /**
   * Perform the action on the given models.
   *
   * @param  \Laravel\Nova\Fields\ActionFields  $fields
   * @param  \Illuminate\Support\Collection  $models
   * @return mixed
   */
  public function handle(ActionFields $fields, Collection $models)
  {
    return Action::openInNewTab(route("photos-export"));
  }

  /**
   * Get the fields available on the action.
   *
   * @return array
   */
  public function fields()
  {
    return [];
  }
}
