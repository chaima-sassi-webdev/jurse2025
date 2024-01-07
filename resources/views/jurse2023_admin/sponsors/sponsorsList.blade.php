

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
                @foreach($sponsors as $sponsors)
                <tr> 
                  <td><img src="{{ asset($sponsors->src) }}" style="max-width: 200px; max-height: 50px;"/></td>
                  <td>{{ $sponsors->order }}</td>
                  <td>{{ $sponsors->alt }}</td>
                  <td> <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#updateSponsorModal{{ $sponsors->id }}">
                        <i class="fas fa-edit"></i> Update
                    </button>
 <!-- Update Speaker Modal -->
                    <div class="modal fade" id="updateSponsorModal{{ $sponsors->id }}" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Update Sponsor</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="post" action="{{ route('admin/sponsors/updateSponsor', ['id' => $sponsors->id]) }}" enctype="multipart/form-data">

                                            @csrf
                                    @method('PUT')
                                   <div class="mb-3">
                                        <label for="order" class="form-label">Order :</label>
                                        <input type="text" class="form-control" id="order" name="order" placeholder="Your sponsors's order " value="{{ old('order', $sponsors->order) }}">
                                        @error('order')
                                          <span class="text-danger">{{ $message }}</span>
                                         @enderror
                                    </div>
                                    <div class="mb-3">
                                        <label for="alt" class="form-label">Alt :</label>
                                        <input type="text" class="form-control" id="alt" name="alt" placeholder="Your sponsor's alt " value="{{ old('alt', $sponsors->alt) }}">
                                        @error('alt')
                                          <span class="text-danger">{{ $message }}</span>
                                         @enderror
                                    </div>

                                    <div class="mb-3">
                                        <label for="src" class="form-label">Current Image:</label>
                                        <img src="{{ asset($sponsors->src) }}" alt="Current sponsors Image" class="img-thumbnail" style="max-width: 200px; max-height: 200px;">
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
                    <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteSponsorModal{{ $sponsors->id }}">
                      delete
                      </a>
                        <!-- Delete Speaker Modal -->
                   <div class="modal fade" id="deleteSponsorModal{{ $sponsors->id }}" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true" >
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Delete Sponsor</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="post" action="{{ route('admin/deleteSponsor', ['id' => $sponsors->id]) }}" enctype="multipart/form-data">

                                            @csrf
                                    @method('DELETE')
                                  <h5> Are you sure to delete the {{$sponsors->order}}</h5>
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

