

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
                  <th scope="col">Title</th>
                  <th scope="col">Href</th>
                </tr>
              </thead>
              <tbody>
                @foreach($links as $link)
                <tr>
                  
                  <td>{{ $link->title }}</td>
                  <td>{{ $link->href }}</td>
                  <td> <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#updateLink{{ $link->id }}">
                        <i class="fas fa-edit"></i> Update
                    </button>

                    <!-- Update Link Modal -->
                    <div class="modal fade" id="updateLink{{ $link->id }}" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Update Link</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="post" action="{{ route('admin/updateLink', ['id' => $link->id]) }}" enctype="multipart/form-data">

                                            @csrf
                                    @method('PUT')
                                    <div class="mb-3">
                                        <label for="title" class="form-label">Url</label>
                                        <input type="text" class="form-control" id="url" name="title" placeholder="Your Link's Title " value="{{ old('title', $link->title) }}">
                                        @error('title')
                                          <span class="text-danger">{{ $message }}</span>
                                         @enderror
                                    </div>
                                   <div class="mb-3">
                                        <label for="href" class="form-label">href</label>
                                        <input type="text" class="form-control" id="href" name="href" placeholder="Your link's href " value="{{ old('href', $link->href) }}">
                                        @error('href')
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
                  <td><a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteLinkModal{{ $link->id }}">
                      delete
                      </a>
                        <!-- Delete Link Modal -->
                    <div class="modal fade" id="deleteLinkModal{{ $link->id }}" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true" >
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Delete Link</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="post" action="{{ route('admin/deleteLink', ['id' => $link->id]) }}" enctype="multipart/form-data">

                                            @csrf
                                    @method('DELETE')
                                  <h5> Are you sure to delete {{ $link->title}}</h5>
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

