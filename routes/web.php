<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/site/{id}',  function($id) {
    return Inertia::render('Aws', [
        'id' => base64_decode($id),
    ]);
})->name('aws.site');

Route::get('/secret/ict-tool',  function() {
    return Inertia::render('Icttool',);
})->name('ict.site');