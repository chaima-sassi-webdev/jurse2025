

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
                  <th scope="col">Image :</th>
                  <th scope="col">Order :</th>
                  <th scope="col">Alt Text : </th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                @foreach($photos as $photos)
                <tr> 
                  <td><img src="{{ asset($photos->src) }}" style="max-width: 200px; max-height: 50px;"/></td>
                  <td>{{ $photos->order }}</td>
                  <td>{{ $photos->alt }}</td>
                  <td> <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#updatePhotosModal{{ $photos->id }}">
                        <i class="fas fa-edit"></i> Update
                    </button>
 <!-- Update Speaker Modal -->
                    <div class="modal fade" id="updatePhotosModal{{ $photos->id }}" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Update Photo</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="post" action="{{ route('admin/photos/updatePhoto', ['id' => $photos->id]) }}" enctype="multipart/form-data">

                                            @csrf
                                    @method('PUT')
                                   <div class="mb-3">
                                        <label for="order" class="form-label">Order :</label>
                                        <input type="text" class="form-control" id="order" name="order" placeholder="Your photos's order " value="{{ old('order', $photos->order) }}">
                                        @error('order')
                                          <span class="text-danger">{{ $message }}</span>
                                         @enderror
                                    </div>
                                    <div class="mb-3">
                                        <label for="alt" class="form-label">Alt :</label>
                                        <input type="text" class="form-control" id="alt" name="alt" placeholder="Your sponsor's alt " value="{{ old('alt', $photos->alt) }}">
                                        @error('alt')
                                          <span class="text-danger">{{ $message }}</span>
                                         @enderror
                                    </div>

                                    <div class="mb-3">
                                        <label for="src" class="form-label">Current Image:</label>
                                        <img src="{{ asset($photos->src) }}" alt="Current photos Image" class="img-thumbnail" style="max-width: 200px; max-height: 200px;">
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
                  <td>
                    <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deletePhotosModal{{ $photos->id }}">
                      delete
                      </a>
                        <!-- Delete Speaker Modal -->
                   <div class="modal fade" id="deletePhotosModal{{ $photos->id }}" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true" >
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Delete Photo</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="post" action="{{ route('admin/deletePhotos', ['id' => $photos->id]) }}" enctype="multipart/form-data">

                                            @csrf
                                    @method('DELETE')
                                  <h5> Are you sure to delete the {{$photos->order}} iéme Photos</h5>
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

