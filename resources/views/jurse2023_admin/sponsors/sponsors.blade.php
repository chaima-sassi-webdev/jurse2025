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
    <form method="post" action="{{ route('admin/sponsors/store') }}"  enctype="multipart/form-data">
                @csrf
         <div class="d-flex justify-content-between align-items-center mb-3">
                    <h1 class="text-center mb-0">Create New Sponsor</h1>
         </div>
        <div class="mb-3">
            <label for="src" class="form-label">Image Source:</label>
            <input type="file" class="form-control" id="src" name="src" required>
        </div>

        <div class="mb-3">
            <label for="alt" class="form-label">Alt Text:</label>
            <input type="text" class="form-control" id="alt" name="alt" required>
        </div>

        <div class="mb-3">
            <label for="order" class="form-label">Order:</label>
            <input type="number" class="form-control" id="order" name="order">
        </div>

        <button type="submit" class="btn btn-primary">Create Sponsor</button>
        <a class="btn btn-primary" href={{ route('admin/sponsorslist')}}>List</a>
    </form>
</div>
</div>
</div>


@endsection