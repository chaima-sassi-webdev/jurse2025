

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
            <form method="post" action="{{ route('admin/links/store') }}">
                @csrf
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h1 class="text-center mb-0">Create New Link</h1>
                   
                </div>
                <div class="mb-3">
                    <label for="href" class="form-label">Href</label>
                    <input type="text" class="form-control" id="href" name="href" placeholder="URL ">
                    @error('href')
                      <span class="text-danger">{{ $message }}</span>
                     @enderror
                </div>


             <div class="mb-3">
                  <label for="title" class="form-label">Title</label>
                  <input type="text" class="form-control" id="title" name="title">

                @error('title')
                    <span class="text-danger">{{ $message }}</span>
                @enderror
            </div>

                <button type="submit" class="btn btn-primary">Create</button>
                <a class="btn btn-primary" href={{ route('admin/linksList')}}>List</a>
            </form>
         </div>
        </div>

@endsection


