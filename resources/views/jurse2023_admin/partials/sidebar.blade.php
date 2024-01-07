 <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-custom-color">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <a href="#" class="nav-link align-middle px-0">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline text-white">Dashboard</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('admin/links')}}" class="nav-link align-middle px-0">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline text-white">Links</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin/pages') }}" class="nav-link px-0 align-middle" data-link="pages">
                            <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline text-white">Pages</span>
                        </a>
                    </li>



                    <li>
                        <a href="{{ route('admin/session')}}"  class="nav-link px-0 align-middle text-white">
                            <i class="fs-4 bi-grid"></i> <span class="ms-1 d-none d-sm-inline">Sessions</span> </a>
                    </li>

                    <li>
                        <a href="{{ route('admin/createPhoto')}}" class="nav-link px-0 align-middle text-white">
                            <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Images</span> </a>
                    </li>


                    <li>
                        <a href="#" class="nav-link px-0 align-middle text-white">
                            <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Authors</span> </a>
                    </li>

                    <li>
                        <a href="{{ route('admin/speakers')}}" class="nav-link px-0 align-middle text-white">
                            <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Speakers</span> </a>
                    </li>
                     <li>
                        <a href="{{ route('admin/createSponsor')}}" class="nav-link px-0 align-middle text-white">
                            <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Sponsors</span> </a>
                    </li>
                
                </ul>
                <hr>
                <div class="dropdown pb-4">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle">
                        <span class="d-none d-sm-inline mx-1">loser</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
