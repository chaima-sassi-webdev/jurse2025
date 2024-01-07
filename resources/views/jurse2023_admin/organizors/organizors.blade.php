

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
            <form method="post" action="{{ route('store') }}">
                @csrf
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h1 class="text-center mb-0">Create New Organizors</h1>
                    <a href="{{ route('programList') }}" class="btn btn-primary">Organizors  List</a>
                </div>
                <div class="mb-3">
                    <label for="url" class="form-label">URL</label>
                    <input type="text" class="form-control" id="url" name="url" placeholder="Your Organizor's url ">
                    @error('url')
                      <span class="text-danger">{{ $message }}</span>
                     @enderror
                </div>


             <div class="mb-3">
                  <label for="image" class="form-label">image</label>
                  <input type="file" class="form-control" id="image" name="image">

                @error('image')
                    <span class="text-danger">{{ $message }}</span>
                @enderror
            </div>

                <button type="submit" class="btn btn-primary">Create</button>
            </form>
         </div>
        </div>

@endsection


