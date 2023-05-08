<?php

namespace App\Providers;

use App\Nova\Metrics\AllPhotos;
use App\Nova\Metrics\NewUsers;
use App\Nova\Metrics\NewValidPhotos;
use App\Nova\Metrics\PhotosWaiting;
use Illuminate\Support\Facades\Gate;
use Laravel\Nova\Nova;
use Laravel\Nova\NovaApplicationServiceProvider;

class NovaServiceProvider extends NovaApplicationServiceProvider
{
  /**
   * Bootstrap any application services.
   *
   * @return void
   */
  public function boot()
  {
    parent::boot();
  }

  /**
   * Register the Nova routes.
   *
   * @return void
   */
  protected function routes()
  {
    Nova::routes()
      ->withAuthenticationRoutes()
      ->withPasswordResetRoutes()
      ->register();
  }

  /**
   * Register the Nova gate.
   *
   * This gate determines who can access Nova in non-local environments.
   *
   * @return void
   */
  protected function gate()
  {
    Gate::define('viewNova', function ($user) {
      return in_array($user->email, [
        'admin@gilicegenerations.com'
      ]);
    });
  }

  /**
   * Get the cards that should be displayed on the default Nova dashboard.
   *
   * @return array
   */
  protected function cards()
  {
    return [
      new NewUsers(),
      new AllPhotos(),
      new NewValidPhotos(),
      new PhotosWaiting(),
    ];
  }

  /**
   * Get the extra dashboards that should be displayed on the Nova dashboard.
   *
   * @return array
   */
  protected function dashboards()
  {
    return [];
  }

  /**
   * Get the tools that should be listed in the Nova sidebar.
   *
   * @return array
   */
  public function tools()
  {
    return [];
  }

  /**
   * Register any application services.
   *
   * @return void
   */
  public function register()
  {
    //
  }
}
