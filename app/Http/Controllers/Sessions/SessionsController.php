<?php

namespace App\Http\Controllers\Sessions;
use App\Http\Controllers\Controller;
use App\Models\Sessions\Sessions;
use App\Models\Authors\Authors;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class SessionsController extends Controller
{
    public function index() {
         $authors = Authors::all();
        return view('jurse2023_admin.sessions.sessions', ['authors', $authors]);
    }
    public function index2() {
        $sessions = Sessions::all();
       
        return view('jurse2023_admin.sessions.sessions', ['sessions' => $sessions]);
    }
    public function create_Session(Request $request)
    {
        // Validation rules can be adjusted based on your requirements
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'order' => 'required|string|max:255',
            'author_id' => 'required|exists:authors,id'
        ]);

        // Create a new Program instance
        $sessions = new Sessions([

            'description' => $request->input('description'),
            'title' => $request->input('title'),
            'order' => $request->input('order'),
         ]);
    $author = Authors::find($request->input('author_id'));

    // Associate the session with the specified author
    $session->authors()->associate($author);

        // Save the program to the database
        $sessions->save();

        // Redirect or perform any other actions as needed
        return redirect()->route('admin/session')->with('success', 'Session created successfully');
    }
}
