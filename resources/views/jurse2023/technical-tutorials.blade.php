<!DOCTYPE html>
<html dir="ltr" lang="en-US" style="position: relative; min-height: 100%;">
    
<!-- Mirrored from jurse2023.org/technical-tutorials.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 15 Dec 2023 21:24:52 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>
        
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BD3C8E34SP"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BD3C8E34SP');
        </script>

        <meta http-equiv="content-type" content="text/html; charset=utf-8" />

        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700|Poppins:300,400,500,600,700|PT+Serif:400,400i&amp;display=swap" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="css/bootstrap.css" type="text/css" />
        <link rel="stylesheet" href="css/style.css" type="text/css" />
        <link rel="stylesheet" href="css/dark.css" type="text/css" />
        <link rel="stylesheet" href="css/font-icons.css" type="text/css" />
        <link rel="stylesheet" href="css/animate.css" type="text/css" />
        <link rel="stylesheet" href="css/magnific-popup.css" type="text/css" />

        <link rel="stylesheet" href="css/custom.css" type="text/css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="images/favicon.ico">

        <title>Technical Tutorials | JURSE 2023 - Joint Urban Remote Sensing Event</title>

    </head>

    <body class="stretched">

 <header id="header" class="full-header">
            <div id="header-wrap">
                <div class="container">
                    <div class="header-row">

                        <div id="logo">
                            <a href="{{ route('index-2.html') }}" class="standard-logo" data-dark-logo="images/logo.png"><img src="images/logo.png" alt="RSLab Logo"></a>
                        </div>

                        <div id="primary-menu-trigger">
                            <svg class="svg-trigger" viewBox="0 0 100 100"><path d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"></path><path d="m 30,50 h 40"></path><path d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"></path></svg>
                        </div>

                        <nav class="primary-menu">

                            <ul class="menu-container">
                                <li class="menu-item">
                                    <a class="menu-link" href="{{ route('index.html') }}"><div>Home</div></a>
                                </li>
                                <li class="menu-item">
                                    <a class="menu-link" href="{{ route('dates.html') }}"><div>Dates</div></a>
                                </li>
                                <li class="menu-item">
                                    <a class="menu-link cursor-normal"><div>Participation<i class="icon-caret-down1"></i></div></a>
                                    <ul class="sub-menu-container">
                                        <li class="menu-item">
                                            <a class="menu-link" href="{{ route('program.html') }}"><div>Program</div></a>
                                        </li>
                                        <li class="menu-item">
                                            <a class="menu-link" href="{{ route('guidelines.html') }}"><div>Guidelines</div></a>
                                        </li>
                                        <li class="menu-item">
                                            <a class="menu-link" href="{{ route('call-for-papers.html') }}"><div>Call for Papers</div></a>
                                        </li>
                                        <li class="menu-item">
                                            <a class="menu-link" href="{{ route('registration.html') }}"><div>Registration</div></a>
                                        </li>
                                        <li class="menu-item">
                                            <a class="menu-link" href="{{ route('social-events.html') }}"><div>Social Events</div></a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="menu-item">
                                    <a class="menu-link cursor-normal"><div>Presentation<i class="icon-caret-down1"></i></div></a>
                                    <ul class="sub-menu-container">
                                        <li class="menu-item">
                                            <a class="menu-link" href="{{ route('keynotes.html') }}"><div>Keynotes</div></a>
                                        </li>
                                        <li class="menu-item">
                                            <a class="menu-link" href="{{ route('topics.html') }}"><div>Topics</div></a>
                                        </li>
                                        <li class="menu-item">
                                            <a class="menu-link" href="{{ route('special-sessions.html') }}"><div>Special Sessions</div></a>
                                            <ul class="sub-menu-container">
                                                <li class="menu-item">
                                                    <a class="menu-link" href="{{ route('special-sessions/future-settlement-growth-modelling-with-eo-products.html') }}"><div>Future settlement growth modelling with EO products</div></a>
                                                </li>
                                                <li class="menu-item">
                                                    <a class="menu-link" href="{{ route('special-sessions/geoai-for-monitoring-rapid-urbanization-processes.html') }}"><div>GeoAI for Monitoring Rapid Urbanization Processes</div></a>
                                                </li>
                                                <li class="menu-item">
                                                    <a class="menu-link" href="{{ route('special-sessions/deep-learning-approaches-for-multi-temporal-and-multi-modal-data-processing.html') }}"><div>Deep learning approaches for multi-temporal and multi-modal data processing and analysis for urban areas</div></a>
                                                </li>
                                                <li class="menu-item">
                                                    <a class="menu-link" href="{{ route('special-sessions/urban-remote-sensing-for-the-global-south.html') }}"><div>Urban remote sensing for the Global South</div></a>
                                                </li>
                                                <li class="menu-item">
                                                    <a class="menu-link" href="{{ route('special-sessions/earth-observation-for-integrated-risk-assessment.html') }}"><div>Earth Observation for integrated risk assessment, urban adaptation towards Climate Change and Sustainable Urban Development</div></a>
                                                </li>
                                                <li class="menu-item">
                                                    <a class="menu-link" href="{{ route('special-sessions/urban-thermal-remote-sensing.html') }}"><div>Urban Thermal Remote Sensing</div></a>
                                                </li>
                                                <li class="menu-item">
                                                    <a class="menu-link" href="{{ route('special-sessions/urban-air-quality.html') }}"><div>Urban Air Quality</div></a>
                                                </li>
                                                <li class="menu-item">
                                                    <a class="menu-link" href="{{ route('special-sessions/promoting-urban-resilience-through-methodologies-and-tools.html') }}"><div>Promoting Urban Resilience through Methodologies and Tools Deploying Earth Observation Data</div></a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="menu-item">
                                            <a class="menu-link" href="{{ route('technical-tutorials.html') }}"><div>Technical Tutorials</div></a>
                                        </li>
                                        <li class="menu-item">
                                            <a class="menu-link" href="{{ route('student-contest.html') }}"><div>Student Contest</div></a>
                                        </li>
                                        <li class="menu-item">
                                            <a class="menu-link" href="{{ route('exhibitors.html') }}"><div>Exhibitors</div></a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="menu-item">
                                    <a class="menu-link" href="{{ route('committees.html') }}"><div>Committees</div></a>
                                </li>
                                <li class="menu-item">
                                    <a class="menu-link" href="{{ route('sponsors.html') }}"><div>Sponsors</div></a>
                                </li>
                                <li class="menu-item">
                                    <a class="menu-link cursor-normal"><div>Venue<i class="icon-caret-down1"></i></div></a>
                                    <ul class="sub-menu-container">
                                        <li class="menu-item">
                                            <a class="menu-link" href="{{ route('heraklion-and-crete.html') }}"><div>Heraklion & Crete</div></a>
                                        </li>
                                        <li class="menu-item">
                                            <a class="menu-link" href="{{ route('venue.html') }}"><div>Conference Venue</div></a>
                                        </li>
                                        <li class="menu-item">
                                            <a class="menu-link" href="{{ route('hotels.html') }}"><div>Hotels</div></a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="menu-item">
                                    <a class="menu-link" href="{{ route('videos-and-photos.html') }}"><div>Videos & Photos</div></a>
                                </li>
                                <li class="menu-item">
                                    <a class="menu-link" href="{{ route('contact.html') }}"><div>Contact</div></a>
                                </li>
                            </ul>

                        </nav>
                    </div>
                </div>
            </div>
            <div class="header-wrap-clone"></div>
        </header>
           
        <div class="section mt-0 py-5">
            <div class="container">
                <h3 class="mb-0">
                    Technical Tutorials
                </h3>
            </div>
        </div>

        <div class="container mb-5">

            <h3 class="mt-5 mb-3">DART model: A hands-on introduction to the Discrete Anisotropic Radiative Transfer (DART) Model</h3>
            <p><i>Tutor: <b>Prof. Jean-Philippe Gastellu-Etchegorry</b> (CESBIO)</i></p>

            <p>
                <a class="text-decoration-underline" href="https://dart.omp.eu/" target="_blank">DART</a> is an ever-evolving radiative transfer model. 
                It simulates the 3D radiative budget (RB) and remote sensing (RS) satellite, 
                airborne and in-situ signals (spectroradiometer, LiDAR) of urban and natural landscapes, 
                from visible to thermal infrared. It is a reference tool for a wide range of RS studies (sensitivity studies, 
                inversion of RS images, design of new RS sensor, etc.). Licenses are free for research and education. 
                This tutorial is aimed to discover and/or deepen DART theory and functionalities.
            </p>

            <p>
                <b>Expected requirements:</b> <br>
                <a class="text-decoration-underline" href="https://dart.omp.eu/Public/documentation/contenu/documentation/DART_User_Manual.pdf" target="_blank">DART User Manual</a> (Work Package WP0). 
                Please install <a class="text-decoration-underline" href="https://mycore.core-cloud.net/index.php/s/7ytNOZ3KZTxCzZR" target="_blank">DART_5-9-6_2023-04-26_v1325</a> and <a class="text-decoration-underline" href="https://mycore.core-cloud.net/index.php/s/7ytNOZ3KZTxCzZR" target="_blank">WP0</a> 
                (<a class="text-decoration-underline" href="https://dart.omp.eu/index.php#/getDart" target="_blank">Free DART license</a> can be acquired).
            </p>

            <h3 class="mt-5 mb-3">Google Earth Engine: A hands-on introduction to Google Earth Engine</h3>
            <p><i>Tutor: <b>Noel Gorelick</b> (Google)</i></p>

            <p>
                This session is a hands-on workshop that takes participants through the basics of getting up and running with <a class="text-decoration-underline" href="https://earthengine.google.com/" target="_blank">Earth Engine</a>. 
                Participants will learn how to perform tasks such as image visualization, time-series compositing and areal statistic 
                computations using the Earth Engine API and interactive development environment.
            </p>

            <p>
                <b>Expected requirements:</b> <br>
                Recent version of Google Chrome installed<br>
            </p>

            <h3 class="mt-5 mb-3">EnMAP-Box: A hands-on introduction to the EnMAP-Box, a QGIS Plugin for Imaging Spectroscopy and Remote Sensing</h3>
            <p><i>Tutor: <b>Andreas Janz</b> (Humboldt University of Berlin)</i></p>

            <p>
                We show various basic and advanced components of the EnMAP-Box. Participants learn how to manage, 
                visualize and process raster and vector data inside the EnMAP-Box. We detail the multiple-viewer concept, 
                that allows the exploration of data in different visualizations at the same time. We highlight, 
                how we capitalize on the spectral characteristics of optical (hyperspectral) EO data, 
                e.g. by correctly plotting pixel profiles against the given center wavelength, or by quickly selecting target bands for visualization. 
                Finally, we perform a Regression-based Unmixing Workflow using urban EnMAP data to illustrate EO data processing inside the EnMAP-Box.
            </p>

            <p>
                <b>Expected requirements:</b> <br>
                QGIS 3.28 with EnMAP-Box 3.12 installed (will be released in April 2023) <br>
                Installation instructions: <a class="text-decoration-underline" href="https://enmap-box.readthedocs.io/en/latest/usr_section/usr_installation.html" target="_blank">https://enmap-box.readthedocs.io/en/latest/usr_section/usr_installation.html</a> <br>
            </p>

            <h3 class="mt-5 mb-3">Geohazards Exploitation Platform: Online EO Processing Services for Mapping and Monitoring Hazard-prone Areas in Urban Contextt</h3>
            <p><i>Tutor: <b>Dr. Michael Foumelis</b> (Aristotle University of Thessaloniki)</i></p>

            <p>
                The <a class="text-decoration-underline" href="https://geohazards-tep.eu/#" target="_blank">Geohazards Exploitation Platform</a> (GEP) is a cloud-based environment 
                providing access to satellite imagery and EO processing services that 
                allow for the mapping of hazard-prone land surfaces and monitoring of 
                terrain motion. The platform is continuously expanding to address the 
                constantly evolving objectives of the geohazards community, by integrating 
                a broad range of on-demand and systematic services hosted on cloud 
                resources. This tutorial aims to introduce the platform's interface 
                and available operational services while demonstrating its applicability 
                to the monitoring of urban environments. 
            </p>

            <p>
                <b>Expected requirements:</b> <br>
                Recent version of <a class="text-decoration-underline" href="https://qgis.org/en/site/forusers/download.html" target="_blank">QGIS</a> installed <br>
            </p>

        </div>

        <footer class="text-center text-lg-start bg-footer mt-5">
            <div class="container p-4">
                <section class="footer-text">
                    <div class="row">

                        <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3 text-center">
                            <div class="mb-2">
                                <h4 class="white">Stay connected!</h4>
                            </div>
                            <a href="https://www.facebook.com/rslabgr/" target="_blank" class="social-icon inline-block si-dark si-small mb-0 pb-0 si-facebook">
                                <i class="icon-facebook"></i>
                                <i class="icon-facebook"></i>
                            </a>

                            <a href="https://twitter.com/JURSE2023/" target="_blank" class="social-icon inline-block si-dark si-small si-borderless mb-0 si-twitter">
                                <i class="icon-twitter"></i>
                                <i class="icon-twitter"></i>
                            </a>

                            <a href="https://www.youtube.com/playlist?list=PLyHJqeu2tpN5iLzj1HaVP9oCirvFoBN7r" target="_blank" class="social-icon inline-block si-dark si-small si-borderless mb-0 si-youtube">
                                <i class="icon-youtube"></i>
                                <i class="icon-youtube"></i>
                            </a>
                        </div>

                        <hr class="w-100 clearfix d-md-none mt-3" />

                        <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3 text-center">
                            <div class="mb-1">
                                <h4 class="white mb-0">Contact person</h4>
                            </div>
                            Nektarios Chrysoulakis<br>
                            zedd2@iacm.forth.gr<br>
                            +30 2810-391-762 <br>
                            +30 6932-929-775
                        </div>

                        <hr class="w-100 clearfix d-md-none mt-3" />

                        <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3 text-center">
                            <div class="mb-1">
                                <h4 class="white mb-0">Venue</h4>
                            </div>
                            Cultural Conference Center of Heraklion<br>
                            N. Plastira Avenue 49, Heraklion, 71201 Greece
                        </div>
                    </div>

                </section>
            </div>
            <div class="text-center p-3 footer-text" style="background-color: rgba(0, 0, 0, 0.2)">
                © Copyright <span id="year"></span>: Remote Sensing Laboratory, Foundation for Research and Technology - Hellas (FORTH)
            </div>

        </footer>

        <script>
            document.getElementById("year").innerHTML = new Date().getFullYear();
        </script>
        <script src="js/jquery.js"></script>
        <script src="js/plugins.min.js"></script>
        <script src="js/functions.js"></script>

    </body>

<!-- Mirrored from jurse2023.org/technical-tutorials.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 15 Dec 2023 21:24:52 GMT -->
</html>
