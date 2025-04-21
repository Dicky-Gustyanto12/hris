<?php


use Illuminate\Http\Request;
use App\Models\Responsibility;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\TeamController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\CompanyController;
use App\Http\Controllers\API\EmployeeController;
use App\Http\Controllers\API\ResponsibilityController;

//Auth API

// Rute untuk login pengguna
Route::post('login', [UserController::class, 'login']);

// Rute untuk registrasi pengguna
Route::post('register', [UserController::class, 'register']);

// Rute untuk logout pengguna dengan middleware yang benar
Route::post('logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

// Rute untuk mengambil informasi pengguna
Route::get('user', [UserController::class, 'fetch'])->middleware('auth:sanctum');

// Rute untuk mengambil semua pengguna
Route::get('users', [UserController::class, 'all'])->middleware('auth:sanctum');


// Company API

// Rute untuk mendapatkan semua perusahaan
Route::get('company', [CompanyController::class, 'all']);

// Rute untuk registrasi perusahaan
Route::post('company', [CompanyController::class, 'create'])->middleware('auth:sanctum');

// Rute untuk update company
Route::post('company/update/{id}', [CompanyController::class, 'update'])->middleware('auth:sanctum');

// Rute untuk fetch company
Route::get('company', [CompanyController::class, 'fetch'])->middleware('auth:sanctum');


// Team API

// Rute untuk registrasi team
Route::post('team', [TeamController::class, 'create'])->middleware('auth:sanctum');

// Rute untuk update team
Route::post('team/update/{id}', [TeamController::class, 'update'])->middleware('auth:sanctum');

// Rute untuk fetch team
Route::get('team', [TeamController::class, 'fetch'])->middleware('auth:sanctum');

// Rute untuk menghapus team
Route::delete('team/{id}', [TeamController::class, 'delete'])->middleware('auth:sanctum');


// Role API

// Rute untuk registrasi role
Route::post('role', [RoleController::class, 'create'])->middleware('auth:sanctum');

// Rute untuk update role
Route::post('role/update/{id}', [RoleController::class, 'update'])->middleware('auth:sanctum');

// Rute untuk fetch role
Route::get('role', [RoleController::class, 'fetch'])->middleware('auth:sanctum');

// Rute untuk menghapus role
Route::delete('role/{id}', [RoleController::class, 'delete'])->middleware('auth:sanctum');


// Responsibility API

// Rute untuk registrasi responsibility
Route::post('responsibility', [ResponsibilityController::class, 'create'])->middleware('auth:sanctum');

// Rute untuk update responsibility
Route::post('responsibility/update/{id}', [ResponsibilityController::class, 'update'])->middleware('auth:sanctum');

// Rute untuk fetch responsibility
Route::get('responsibility', [ResponsibilityController::class, 'fetch'])->middleware('auth:sanctum');

// Rute untuk menghapus responsibility
Route::delete('responsibility/{id}', [ResponsibilityController::class, 'delete'])->middleware('auth:sanctum');



// Employee API

// Rute untuk registrasi employee
Route::post('employee', [EmployeeController::class, 'create'])->middleware('auth:sanctum');

// Rute untuk update employee
Route::post('employee/update/{id}', [EmployeeController::class, 'update'])->middleware('auth:sanctum');

// Rute untuk fetch employee
Route::get('employee', [EmployeeController::class, 'fetch'])->middleware('auth:sanctum');

// Rute untuk menghapus employee
Route::delete('employee/{id}', [EmployeeController::class, 'delete'])->middleware('auth:sanctum');
