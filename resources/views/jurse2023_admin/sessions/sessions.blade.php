

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
                    <h1 class="text-center mb-0">Create New Session </h1>
                    <a href="{{ route('programList') }}" class="btn btn-primary">Session's  List</a>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    
                    <textarea type="text" class="form-control" id="description" name="description"  placeholder="Your session's title "> </textarea>
                    @error('description')
                      <span class="text-danger">{{ $message }}</span>
                     @enderror
                </div>


            

             <div class="mb-3">
                  <label for="content" class="form-label">CONTENT</label>
                  <input type="text" class="form-control" id="content" name="content">

                @error('content')
                    <span class="text-danger">{{ $message }}</span>
                @enderror
            </div>

                <button type="submit" class="btn btn-primary">Create</button>
            </form>
         </div>
        </div>

@endsection


