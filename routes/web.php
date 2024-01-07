<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Links\LinksController;
use App\Http\Controllers\Pages\PagesController;
use App\Http\Controllers\Organizors\OrganizorsController;
use App\Http\Controllers\Sessions\SessionsController;
use App\Http\Controllers\Speakers\SpeakersController;
use App\Http\Controllers\Sponsors\SponsorController;
use App\Http\Controllers\Photo\PhotoController;


/*****************************************************************************************************************************************************************/
/*************************************************************       routes of user interfaces       *****************************************************/
/******************************************************                                                        ********************************************************/

Route::get('/', function () {return view('jurse2023.index');});
Route::get('/index.html', [HomeController::class, 'userHome'])->name('index.html');
Route::get('/dates.html', [HomeController::class, 'userDate'])->name('dates.html');
Route::get('/index-2.html', [HomeController::class, 'userHome'])->name('index-2.html');
Route::get('/program.html', [HomeController::class, 'userProgram'])->name('program.html');
Route::get('/guidelines.html', [HomeController::class, 'userGuideline'])->name('guidelines.html');
Route::get('/call-for-papers.html', [HomeController::class, 'userCallForPapers'])->name('call-for-papers.html');
Route::get('/registration.html', [HomeController::class, 'userRegistration'])->name('registration.html');
Route::get('/social-events.html', [HomeController::class, 'userSocialEvents'])->name('social-events.html');
Route::get('/keynotes.html', [SpeakersController::class, 'index'])->name('keynotes.html');
Route::get('/topics.html', [HomeController::class, 'userTopics'])->name('topics.html');
Route::get('/special-sessions.html', [HomeController::class, 'userSpecialSessions'])->name('special-sessions.html');
Route::get('/special-sessions/future-settlement-growth-modelling-with-eo-products.html', [HomeController::class, 'userProducts'])->name('special-sessions/future-settlement-growth-modelling-with-eo-products.html');
Route::get('/special-sessions/geoai-for-monitoring-rapid-urbanization-processes.html', [HomeController::class, 'userProcess'])->name('special-sessions/geoai-for-monitoring-rapid-urbanization-processes.html');
Route::get('/special-sessions/deep-learning-approaches-for-multi-temporal-and-multi-modal-data-processing.html', [HomeController::class, 'userDataProcess'])->name('special-sessions/deep-learning-approaches-for-multi-temporal-and-multi-modal-data-processing.html');
Route::get('/special-sessions/urban-remote-sensing-for-the-global-south.html', [HomeController::class, 'userSensing'])->name('special-sessions/urban-remote-sensing-for-the-global-south.html');
Route::get('/special-sessions/earth-observation-for-integrated-risk-assessment.html', [HomeController::class, 'userAssesment'])->name('special-sessions/earth-observation-for-integrated-risk-assessment.html');
Route::get('/special-sessions/urban-thermal-remote-sensing.html', [HomeController::class, 'userSensingremote'])->name('special-sessions/urban-thermal-remote-sensing.html');
Route::get('/special-sessions/urban-air-quality.html', [HomeController::class, 'userAirQuality'])->name('special-sessions/urban-air-quality.html');
Route::get('/special-sessions/promoting-urban-resilience-through-methodologies-and-tools.html', [HomeController::class, 'userTools'])->name('special-sessions/promoting-urban-resilience-through-methodologies-and-tools.html');
Route::get('/technical-tutorials.html', [HomeController::class, 'userTutorials'])->name('technical-tutorials.html');
Route::get('/student-contest.html', [HomeController::class, 'userContest'])->name('student-contest.html');
Route::get('/exhibitors.html', [HomeController::class, 'userExhibitors'])->name('exhibitors.html');
Route::get('/committees.html', [HomeController::class, 'userCommittees'])->name('committees.html');
Route::get('/sponsors.html', [SponsorController::class, 'sponsors'])->name('sponsors.html');
Route::get('/heraklion-and-crete.html', [HomeController::class, 'userHeraklion'])->name('heraklion-and-crete.html');
Route::get('/venue.html', [HomeController::class, 'userVenue'])->name('venue.html');
Route::get('/hotels.html', [HomeController::class, 'userHotels'])->name('hotels.html');
Route::get('/videos-and-photos.html', [HomeController::class, 'userMedia'])->name('videos-and-photos.html');
Route::get('/contact.html', [HomeController::class, 'userSocialEvents'])->name('contact.html');
Route::get('/backoffice.ccbsgreece.gr/clients/jurse-23.html', [HomeController::class, 'userRegistrationn'])->name('backoffice.ccbsgreece.gr/clients/jurse-23.html');


/*****************************************************************************************************************************************************************/
/*************************************************************       routes of admin interfaces       *****************************************************/
/******************************************************                                                        ********************************************************/
Auth::routes();
Route::get('/admin', function() {  return view('welcome');});
Route::get('/home', [HomeController::class, 'index'])->name('/home');
Route::get('/admin/home', [HomeController::class, 'index'])->name('admin/home');
Route::get('/admin/pages',[PagesController::class, 'index'])->name('admin/pages');

Route::get('/admin/links',[LinksController::class, 'index'])->name('admin/links');
Route::get('/admin/img_vid',[MediasController::class, 'index'])->name('admin/img_vid');
Route::get('/admin/session',[SessionsController::class, 'index'])->name('admin/session');
Route::get('/admin/postersession',[OrganizorsController::class, 'index'])->name('admin/postersession');
Route::get('/admin/speakers',[SpeakersController::class, 'index2'])->name('admin/speakers');
Route::post('/admin/speakers/store',[SpeakersController::class, 'create_Speakers'])->name('speakers/store');
Route::put('/admin/speakers/{id}', [SpeakersController::class, 'updateSpeaker'])->name('admin/speakers/updateSpeaker');
Route::get('/admin/speakerslist',[SpeakersController::class, 'ListOfSpeakers'])->name('admin/speakerslist');
Route::delete('/admin/deleteSpeaker/{id}',[SpeakersController::class, 'deleteSpeaker'])->name('admin/deleteSpeaker');

/** Sponsors Routers */
Route::get('/admin/createSponsor',[SponsorController::class, 'index'])->name('admin/createSponsor');
Route::post('/admin/sponsors/store',[SponsorController::class, 'storeSponsor'])->name('admin/sponsors/store');
Route::get('/admin/sponsorslist',[SponsorController::class, 'index2'])->name('admin/sponsorslist');
Route::put('/admin/sponsors/{id}', [SponsorController::class, 'updateSponsor'])->name('admin/sponsors/updateSponsor');
Route::delete('/admin/deleteSponsor/{id}',[SponsorController::class, 'deleteSponsor'])->name('admin/deleteSponsor');



/** Medias Routers */
Route::get('/admin/createPhoto',[PhotoController::class, 'index'])->name('admin/createPhoto');
Route::post('/admin/medias/photo/store',[PhotoController::class, 'storePhoto'])->name('admin/medias/photo/store');
Route::get('/admin/photoslist',[PhotoController::class, 'index2'])->name('admin/photoslist');
Route::put('/admin/photo/{id}', [PhotoController::class, 'updatePhoto'])->name('admin/photos/updatePhoto');
Route::delete('/admin/deletePhotos/{id}',[PhotoController::class, 'deletePhoto'])->name('admin/deletePhotos');

/** Authors Routers */
Route::get('/admin/createAuthor',[PhotoController::class, 'index'])->name('admin/createAuthor');
Route::post('/admin/medias/photo/store',[PhotoController::class, 'storePhoto'])->name('admin/medias/photo/store');
Route::get('/admin/photoslist',[PhotoController::class, 'index2'])->name('admin/photoslist');
Route::put('/admin/photo/{id}', [PhotoController::class, 'updatePhoto'])->name('admin/photos/updatePhoto');
Route::delete('/admin/deletePhotos/{id}',[PhotoController::class, 'deletePhoto'])->name('admin/deletePhotos');