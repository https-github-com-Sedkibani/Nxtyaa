<?php

namespace App\Nova;

use App\Exports\PhotosExports;
use App\Nova\Actions\DownloadPhotosExcel;
use App\Nova\Actions\ExportUsers;
use App\Nova\Actions\MarkPhotoAsNonValid;
use App\Nova\Actions\MarkPhotoAsValid;
use App\Nova\Filters\ByZone;
use App\Nova\Filters\ImageStatus;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\Image;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Http\Requests\NovaRequest;
use Maatwebsite\LaravelNovaExcel\Actions\DownloadExcel;
use Maatwebsite\LaravelNovaExcel\Actions\ExportToExcel;

class Photo extends Resource
{
  /**
   * The model the resource corresponds to.
   *
   * @var string
   */
  public static $model = \App\Models\Photo::class;

  /**
   * The single value that should be used to represent the resource when being displayed.
   *
   * @var string
   */
  public static $title = 'id';

  /**
   * The columns that should be searched.
   *
   * @var array
   */
  public static $search = [
    'id',
  ];

  /**
   * Get the fields displayed by the resource.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function fields(Request $request)
  {
    return [
      ID::make(__('ID'), 'id')->sortable(),
      Select::make('Statut', 'status')->options([
        'waiting' => 'En cours',
        'accepted' => 'Accpetée',
        'rejected' => 'Annulée',
      ])->displayUsingLabels(),
      Text::make(__('Phone'), 'phone'),
      Image::make('Photo', 'path'),
      Image::make('Résultat', 'edited'),
      BelongsTo::make('Utilisateur', 'user', 'App\Nova\User')->sortable(),
    ];
  }

  /**
   * Get the cards available for the request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function cards(Request $request)
  {
    return [];
  }

  /**
   * Get the filters available for the resource.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function filters(Request $request)
  {
    return [
      new ImageStatus(),
      new ByZone(),
    ];
  }

  /**
   * Get the lenses available for the resource.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function lenses(Request $request)
  {
    return [];
  }

  /**
   * Get the actions available for the resource.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function actions(Request $request)
  {


    return [
      new MarkPhotoAsValid(),
      new MarkPhotoAsNonValid(),
      // (new DownloadExcel()),
      // (new ExportUsers()),
      // (new PhotosExports),
      (new PhotosExports)
        ->withHeadings()
        ->withWriterType(\Maatwebsite\Excel\Excel::CSV),
    ];
  }
}
