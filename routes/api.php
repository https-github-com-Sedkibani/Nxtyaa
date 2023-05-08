<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;



Route::post('/connect', [AuthController::class, 'connect']);
Route::middleware('auth:sanctum')
  ->get('/me', [AuthController::class, 'getUser']);
Route::middleware('auth:sanctum')->post('/photo', [AuthController::class, 'savePhoto']);
Route::get('/photos', [AuthController::class, 'getPhotos']);
Route::get('/participations', [AuthController::class, 'getParticipationsNumber']);
Route::get('/check-account/{fbId}', [AuthController::class, 'checkAccount']);
Route::post('/submit', [AuthController::class, 'submitAnswers'])->middleware('auth:sanctum');
