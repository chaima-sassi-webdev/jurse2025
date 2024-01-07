

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
            <form method="post" action="{{ route('create_date') }}">
                @csrf
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h1 class="text-center mb-0">Create New Day</h1>
                    <a href="{{ route('programList') }}" class="btn btn-primary">Day List</a>
                </div>
                <div class="mb-3">
                    <label for="action" class="form-label">Action</label>
                    <input type="text" class="form-control" id="action" name="action" placeholder="Your day action ">
                    @error('action')
                      <span class="text-danger">{{ $message }}</span>
                     @enderror
                </div>


             <div class="mb-3">
                  <label for="deadline" class="form-label">Deadline</label>
                  <input type="date" class="form-control" id="deadline" name="deadline">

                @error('deadline')
                    <span class="text-danger">{{ $message }}</span>
                @enderror
            </div>

                <button type="submit" class="btn btn-primary">Create</button>
            </form>
         </div>
        </div>

@endsection


