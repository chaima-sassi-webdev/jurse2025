

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
                  <th scope="col">Link</th>
                  <th scope="col">Date tweet</th>
                </tr>
              </thead>
              <tbody>
                @foreach($posts as $post)
                <tr>
                  
                  <td>{{ substr($post->link, 0, 50) }} ...</td>
                  <td>{{ $post->datetweet }}</td>
                  <td> <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#updatePostModal{{ $post->id }}">
                        <i class="fas fa-edit"></i> Update
                    </button>

                    <!-- Update Speaker Modal -->
                    <div class="modal fade" id="updatePostModal{{ $post->id }}" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Update Post</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="post" action="{{ route('admin/updatePost', ['id' => $post->id]) }}" enctype="multipart/form-data">

                                            @csrf
                                    @method('PUT')
                                   <div class="mb-3">
                                        <label for="link" class="form-label">Link</label>
                                        <input type="text" class="form-control" id="link" name="link" placeholder="Your post's link " value="{{ old('link', $post->link) }}">
                                        @error('link')
                                          <span class="text-danger">{{ $message }}</span>
                                         @enderror
                                    </div>
                                    <div class="mb-3">
                                        <label for="datetweet" class="form-label">Date</label>
                                        <input type="text" class="form-control" id="datetweet" name="datetweet" placeholder="Your post's date " value="{{ old('datetweet', $post->datetweet) }}">
                                        @error('datetweet')
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
                  <td><a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deletePostsModal{{ $post->id }}">
                      delete
                      </a>
                        <!-- Delete Speaker Modal -->
                    <div class="modal fade" id="deletePostsModal{{ $post->id }}" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true" >
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Delete Post</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="post" action="{{ route('admin/deletePost', ['id' => $post->id]) }}" enctype="multipart/form-data">

                                            @csrf
                                    @method('DELETE')
                                  <h5> Are you sure to delete this post ? </h5>
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

