<?php

namespace App\Http\Controllers\Organizors;
use App\Http\Controllers\Controller;
use App\Models\Organizors\Organizors;
use Illuminate\Http\Request;

class OrganizorsController extends Controller
{
     public function index() {
        return view('jurse2023_admin.organizors.organizors');
    }
    public function create_organizors(Request $request)
    {
        // Validation rules can be adjusted based on your requirements
        $request->validate([
            'url' => 'required|string|max:255',
            'image' => 'required|string|max:255'
        ]);

        // Create a new Program instance
        $organizors = new Organizors([
            'url' => $request->input('url'),
            'image' => $request->input('image')
        ]);

        // Save the program to the database
        $organizors->save();

        // Redirect or perform any other actions as needed
        return redirect()->route('admin/organizors')->with('success', 'Organizor created successfully');
    }
}
