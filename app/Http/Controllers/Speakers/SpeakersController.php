<?php

namespace App\Http\Controllers\Speakers;
use App\Http\Controllers\Controller;
use App\Models\Speakers\Speakers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class SpeakersController extends Controller
{
     public function index() {

         $speakers = Speakers::all();
        return view('jurse2023.keynotes', ['speakers' => $speakers]);
    }

    
    public function index2() {

        return view('jurse2023_admin.Speakers.Speakers');
    }
    public function ListOfSpeakers() {
        $speakers = Speakers::all();
        return view('jurse2023_admin.speakers.speakersList',['speakers' => $speakers]);
    }
    public function create_Speakers(Request $request)
    {
        // Validation rules can be adjusted based on your requirements
        $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'website' => 'required|string|max:555',
            'description' => 'required|string|max:2000',
            'src'=>'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
         if ($request->hasFile('src')) {
            $image = $request->file('src');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/speakers'), $imageName);
             $newData['src'] = 'images/speakers/' . $imageName;
        }
            $description = substr($request->input('description'), 0, 2000); // Adjust the length as needed

        // Create a new Speakers instance
        $speaker = new Speakers([
            'firstName' => $request->input('firstname'),
            'lastname' => $request->input('lastname'),
            'description' => $description,
            'website' => $request->input('website'),
            'src' => $request->input('src'),
        ]);
 // Save the image path to the database
            $speaker->src = 'images/speakers/' . $imageName;
        // Save the speaker to the database
        $speaker->save();

        // Redirect or perform any other actions as needed
        return redirect()->route('admin/speakers')->with('success', 'Speaker created successfully');
    }
public function updateSpeaker($id, Request $request)
{
    $table = 'speakers';

    // Get the existing speaker
    $speaker = DB::table($table)->where('id', $id)->first();

    // Validate other fields if needed
    $request->validate([
        'firstname' => 'required|string|max:255',
        'lastname' => 'required|string|max:255',
        'website' => 'required|string|max:555',
        'description' => 'required|string|max:2000',
        'src' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    // Process image upload if a new file is provided
    if ($request->hasFile('src')) {
        $image = $request->file('src');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images/speakers'), $imageName);

        // Delete the old image if it exists
        if (file_exists(public_path($speaker->src))) {
            unlink(public_path($speaker->src));
        }

        // Update the image path in the speaker record
        $speaker->src = 'images/speakers/' . $imageName;
    }

    // Update other fields
    $affectedRows = DB::table($table)->where('id', $id)->update([
        'firstname' => $request->input('firstname'),
        'lastname' => $request->input('lastname'),
        'website' => $request->input('website'),
        'description' => $request->input('description'),
        'src' => $speaker->src, // Use the updated image path
    ]);

    if ($affectedRows > 0) {
        return redirect()->route('admin/speakerslist')->with('success', 'Speaker updated successfully');
    } else {
        return redirect()->route('admin/speakerslist')->with('error', 'Failed to update speaker');
    }
}
public function deleteSpeaker($id)
{
    $table = 'speakers';

    // Get the speaker record to delete
    $speaker = DB::table($table)->where('id', $id)->first();

    if (!$speaker) {
        return redirect()->route('admin/speakerslist')->with('error', 'Speaker not found');
    }

    // Delete the associated image file if it exists
    if (file_exists(public_path($speaker->src))) {
        unlink(public_path($speaker->src));
    }

    // Delete the speaker record from the database
    $deletedRows = DB::table($table)->where('id', $id)->delete();

    if ($deletedRows > 0) {
        return redirect()->route('admin/speakerslist')->with('success', 'Speaker deleted successfully');
    } else {
        return redirect()->route('admin/speakerslist')->with('error', 'Failed to delete speaker');
    }
}

}
