

@extends('layouts.app')

@section('content')

<div class="container-fluid">
    <div class="row flex-nowrap">
        @include('jurse2023_admin.partials.sidebar')
         <div class="col py-4" id="dynamic-content">
             @if(session('success'))
                    <div class="alert alert-success">
                        {{ session('success') }}
                    </div>
             @endif
          <table class="table">
              <thead>
                <tr>
                  <th scope="col">FirstName</th>
                  <th scope="col">LastName</th>
                  <th scope="col">Website</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                @foreach($speakers as $speaker)
                <tr>
                  
                  <td>{{ $speaker->firstName }}</td>
                  <td>{{ $speaker->lastname }}</td>
                  <td>{{ $speaker->website }}</td>
                  <td>{{ substr($speaker->description, 0, 50) }} ...</td>
                  <td> <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#updateSpeakerModal{{ $speaker->id }}">
                        <i class="fas fa-edit"></i> Update
                    </button>

                    <!-- Update Speaker Modal -->
                    <div class="modal fade" id="updateSpeakerModal{{ $speaker->id }}" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Update Speaker</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="post" action="{{ route('admin/speakers/updateSpeaker', ['id' => $speaker->id]) }}" enctype="multipart/form-data">

                                            @csrf
                                    @method('PUT')
                                   <div class="mb-3">
                                        <label for="firstname" class="form-label">LastName</label>
                                        <input type="text" class="form-control" id="firstname" name="firstname" placeholder="Your speaker's firstname " value="{{ old('firstname', $speaker->firstName) }}">
                                        @error('lastname')
                                          <span class="text-danger">{{ $message }}</span>
                                         @enderror
                                    </div>
                                    <div class="mb-3">
                                        <label for="lastname" class="form-label">LastName</label>
                                        <input type="text" class="form-control" id="lastname" name="lastname" placeholder="Your speaker's lastname " value="{{ old('lastname', $speaker->lastname) }}">
                                        @error('lastname')
                                          <span class="text-danger">{{ $message }}</span>
                                         @enderror
                                    </div>

                                    <div class="mb-3">
                                        <label for="website" class="form-label">Website</label>
                                        <input type="text" class="form-control" id="website" name="website" placeholder="Your speaker's website " value="{{ old('website', $speaker->website) }}">
                                        @error('website')
                                          <span class="text-danger">{{ $message }}</span>
                                         @enderror
                                    </div>
                                    <div class="mb-3">
                                        <label for="description" class="form-label">Description</label>
                                        <textarea class="form-control" id="description" name="description" placeholder="Your speaker's description " rows="2">{{ old('description', $speaker->description) }}</textarea>
                                        @error('description')
                                            <span class="text-danger">{{ $message }}</span>
                                        @enderror
                                    </div>

                                    <div class="mb-3">
                                        <label for="src" class="form-label">Current Image:</label>
                                        <img src="{{ asset($speaker->src) }}" alt="Current Speaker Image" class="img-thumbnail" style="max-width: 200px; max-height: 200px;">
                                    </div>
                                    <div class="mb-3">
                                        <label for="src" class="form-label">Choose New Image</label>
                                        <input type="file" class="form-control" id="src" name="src" />

                                        @error('src')
                                            <span class="text-danger">{{ $message }}</span>
                                        @enderror
                                    </div>
                                <button type="submit" class="btn btn-primary">Update</button>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>

                </td>
                  <td><a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteSpeakerModal{{ $speaker->id }}">
                      delete
                      </a>
                        <!-- Delete Speaker Modal -->
                    <div class="modal fade" id="deleteSpeakerModal{{ $speaker->id }}" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true" >
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Delete Speaker</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="post" action="{{ route('admin/deleteSpeaker', ['id' => $speaker->id]) }}" enctype="multipart/form-data">

                                            @csrf
                                    @method('DELETE')
                                  <h5> Are you sure to delete {{ $speaker->firstName}} {{ $speaker->lastname}}</h5>
                                <button type="submit" class="btn btn-primary">Delete</button>
                                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                  </td>
                </tr>
               @endforeach
              </tbody>
            </table>
         </div>
        </div>

@endsection

