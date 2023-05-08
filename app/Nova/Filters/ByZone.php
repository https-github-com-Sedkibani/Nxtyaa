<?php

namespace App\Nova\Filters;

use Illuminate\Http\Request;
use Laravel\Nova\Filters\Filter;

class ByZone extends Filter
{
  /**
   * The filter's component.
   *
   * @var string
   */
  public $component = 'select-filter';

  /**
   * Apply the filter to the given query.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Illuminate\Database\Eloquent\Builder  $query
   * @param  mixed  $value
   * @return \Illuminate\Database\Eloquent\Builder
   */
  public function apply(Request $request, $query, $value)
  {
    return $query->join('users', 'users.id', '=', 'photos.user_id')->where('users.zone', '=', $value);
    // return $query->where('status', $value);
  }

  /**
   * Get the filter's available options.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function options(Request $request)
  {
    return [
      'طرابلس والمنطقة الغربية' => 'zone_1',
      'مصراته والمنطقة الوسطى' => 'zone_2',
      'بنغازي والمنطقة الشرقية' => 'zone_3',
      'سبها والمنطقة الجنوبية' => 'zone_4',
    ];
  }
}
