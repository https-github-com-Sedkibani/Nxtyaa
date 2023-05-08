<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConnectRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'name' => 'required',
      'email' => 'required',
      'phone' => 'required',
      'zone' => 'required',
      // 'facebook_id' => 'required',
      // 'zone' => 'required',
    ];
  }

  public function messages()
  {
    return [
      'name.required' => 'يرجى منك إدخال إسمك ',
      'email.required' => 'يرجى منك إدخال حسابك الإلكتروني ',
      'email.unique' => 'هذا الحساب الإلكتروني مستعمل ',
      'phone.required' => 'يرجى منك إدخال رقم الهاتف ',
      'zone.required' => 'يرجى منك إدخال المدينة',
    ];
  }
}
