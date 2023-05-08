<?php

namespace App\Nova\Actions;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;

class UsersExport implements FromCollection
{
  public function collection()
  {
    return User::all();
  }
}
