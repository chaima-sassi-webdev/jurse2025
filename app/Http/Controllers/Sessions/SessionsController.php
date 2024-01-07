<?php

namespace App\Http\Controllers\Sessions;
use App\Http\Controllers\Controller;
use App\Models\Sessions\Sessions;
use Illuminate\Http\Request;

class SessionsController extends Controller
{
    public function index() {
        return view('jurse2023_admin.sessions.sessions');
    }
    public function create_Session(Request $request)
    {
        // Validation rules can be adjusted based on your requirements
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            
        ]);

        // Create a new Program instance
        $Sessions = new Sessions([

            'name' => $request->input('name'),
            'description' => $request->input('description'),
           
        ]);

        // Save the program to the database
        Sessions->save();

        // Redirect or perform any other actions as needed
        return redirect()->route('admin/session')->with('success', 'Session created successfully');
    }
}
