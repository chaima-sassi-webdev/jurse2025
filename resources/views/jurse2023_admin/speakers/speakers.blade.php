

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
            <form method="post" action="{{ route('speakers/store') }}" enctype="multipart/form-data">
                @csrf
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h1 class="text-center mb-0">Create New Speaker</h1>
                </div>
                <div class="mb-3">
                    <label for="firstname" class="form-label">First Name:</label>
                    <input type="text" id="firstname" name="firstname" class="form-control" placeholder="Your speaker's firstname " />
                    @error('firstname')
                      <span class="text-danger">{{ $message }}</span>
                     @enderror
                </div>
                <div class="mb-3">
                    <label for="lastname" class="form-label">LastName</label>
                    <input type="text" class="form-control" id="lastname" name="lastname" placeholder="Your speaker's lastname ">
                    @error('lastname')
                      <span class="text-danger">{{ $message }}</span>
                     @enderror
                </div>

                <div class="mb-3">
                    <label for="website" class="form-label">Website</label>
                    <input type="text" class="form-control" id="website" name="website" placeholder="Your speaker's website ">
                    @error('website')
                      <span class="text-danger">{{ $message }}</span>
                     @enderror
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea type="text" class="form-control" id="description" name="description" placeholder="Your speaker's description " rows="2"></textarea>
                    @error('description')
                      <span class="text-danger">{{ $message }}</span>
                     @enderror
                </div>
                <div class="mb-3">
                    <label for="src" class="form-label">Image</label>
                    <input type="file" class="form-control" id="src" name="src">
                    @error('src')
                        <span class="text-danger">{{ $message }}</span>
                    @enderror
                </div>

                <button type="submit" class="btn btn-primary">Create</button>
                <a class="btn btn-primary" href={{ route('admin/speakerslist')}}>List</a>
            </form>
         </div>
        </div>

@endsection


