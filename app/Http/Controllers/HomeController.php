<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }
        public function userHome()
    {
        return view('jurse2023.index');
    }
     public function userDate()
    {
        return view('jurse2023.dates');
    }
    public function userProgram(){
        return view('jurse2023.program');
    }
    public function userGuideline(){
        return view('jurse2023.guidelines');
    }
    public function userCallForPapers(){
        return view('jurse2023.call-for-papers');
    }
    public function userRegistration(){
        return view('jurse2023.registration');
    }
    public function userSocialEvents(){
        return view('jurse2023.social-events');
    }
     public function userKeynotes(){
        return view('jurse2023.keynotes');
    }
     public function userTopics(){
        return view('jurse2023.topics');
    }
     public function userSpecialSessions(){
        return view('jurse2023.special-sessions');
    }
     public function userProducts(){
        return view('jurse2023.special-sessions.future-settlement-growth-modelling-with-eo-products');
    }
     public function userProcess(){
        return view('jurse2023.special-sessions.geoai-for-monitoring-rapid-urbanization-processes');
    }
     public function userDataProcess(){
        return view('jurse2023.special-sessions.deep-learning-approaches-for-multi-temporal-and-multi-modal-data-processing');
    }
     public function userSensing(){
        return view('jurse2023.special-sessions.urban-remote-sensing-for-the-global-south');
    }
     public function userAssesment(){
        return view('jurse2023.special-sessions.earth-observation-for-integrated-risk-assessment');
    }
     public function userSensingremote(){
        return view('jurse2023.special-sessions.urban-thermal-remote-sensing');
    }
     public function userAirQuality(){
        return view('jurse2023.special-sessions.urban-air-quality');
    }
     public function userTools(){
        return view('jurse2023.special-sessions.promoting-urban-resilience-through-methodologies-and-tools');
    }
     public function userTutorials(){
        return view('jurse2023.technical-tutorials');
    }
       public function userContest(){
        return view('jurse2023.student-contest');
    }
       public function userExhibitors(){
        return view('jurse2023.exhibitors');
    }
       public function userCommittees(){
        return view('jurse2023.committees');
    }
       public function userSponsors(){
        return view('jurse2023.sponsors');
    }
       public function userHeraklion(){
        return view('jurse2023.heraklion-and-crete');
    }
       public function userVenue(){
        return view('jurse2023.venue');
    }
       public function userHotels(){
        return view('jurse2023.hotels');
    }
       public function userMedia(){
        return view('jurse2023.videos-and-photos');
    }
      public function userRegistrationn(){
        return view('jurse2023.registration.registration2');
    }


}
