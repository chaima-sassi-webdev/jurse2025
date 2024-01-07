<?php

namespace App\Http\Controllers\Links;
use App\Http\Controllers\Controller;
use App\Models\Links\Links;

use Illuminate\Http\Request;

class LinksController extends Controller
{
     public function index() {
        return view('jurse2023_admin.links.links');
    }
    public function create_link(Request $request)
    {
        // Validation rules can be adjusted based on your requirements
        $request->validate([
            'url' => 'required|string|max:255',
            'title' => 'required|string|max:255'
        ]);

        // Create a new Program instance
        $links = new Links([
            'url' => $request->input('url'),
            'title' => $request->input('title')
        ]);

        // Save the program to the database
        links->save();

        // Redirect or perform any other actions as needed
        return redirect()->route('admin/links')->with('success', 'Link created successfully');
    }
}
