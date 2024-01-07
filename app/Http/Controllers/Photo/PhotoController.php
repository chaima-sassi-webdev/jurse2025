<?php

namespace App\Http\Controllers\Photo; // Corrected namespace
use App\Http\Controllers\Controller;
use App\Models\Photos\Photos;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class PhotoController extends Controller
{
    public function index()
    {
        return view('jurse2023_admin.Photo.photo');
    }
    public function index2()
    {
        $photos = Photos::all();
        return view('jurse2023_admin.Photo.photoList', ['photos' => $photos]);
    }

    public function storePhoto(Request $request)
    {
        // Validation rules can be adjusted based on your requirements
        $request->validate([
            'src'=>'image|mimes:jpeg,png,jpg,gif|max:2048',
            'alt' => 'required|string|max:255',
            'order' => 'required|string|max:555'
        ]);

        if ($request->hasFile('src')) {
            $image = $request->file('src');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/photos'), $imageName);
            $newData['src'] = 'images/photos/' . $imageName;
        }

        // Create a new Speakers instance
        $photos = new Photos([
            'alt' => $request->input('alt'),
            'order' => $request->input('order'),
            'src' => $request->input('src'),
        ]);

        // Save the image path to the database
        $photos->src = 'images/photos/' . $imageName;

        // Save the speaker to the database
        $photos->save();

        // Redirect or perform any other actions as needed
        return redirect()->route('admin/createPhoto')->with('success', 'Photo created successfully'); // Adjusted route name
    }
    public function updatePhoto($id, Request $request)
{
    $table = 'sponsors';

    // Get the existing speaker
    $sponsors = DB::table($table)->where('id', $id)->first();

    // Validate other fields if needed
    $request->validate([
        'order' => 'required|string|max:255',
        'alt' => 'required|string|max:255',
        'src' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    // Process image upload if a new file is provided
    if ($request->hasFile('src')) {
        $image = $request->file('src');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images/sponsors'), $imageName);

        // Delete the old image if it exists
        if (file_exists(public_path($sponsors->src))) {
            unlink(public_path($sponsors->src));
        }

        // Update the image path in the speaker record
        $sponsors->src = 'images/sponsors/' . $imageName;
    }

    // Update other fields
    $affectedRows = DB::table($table)->where('id', $id)->update([
        'order' => $request->input('order'),
        'alt' => $request->input('alt'),
        'src' => $sponsors->src, // Use the updated image path
    ]);

    if ($affectedRows > 0) {
        return redirect()->route('admin/sponsorslist')->with('success', 'Sponsor updated successfully');
    } else {
        return redirect()->route('admin/sponsorslist')->with('error', 'Failed to update sponsor');
    }
}

public function deletePhoto($id)
{
    $table = 'photos';

    // Get the speaker record to delete
    $photos = DB::table($table)->where('id', $id)->first();

    if (!$photos) {
        return redirect()->route('admin/photosList')->with('error', 'Photo not found');
    }

    // Delete the associated image file if it exists
    if (file_exists(public_path($photos->src))) {
        unlink(public_path($photos->src));
    }

    // Delete the speaker record from the database
    $deletedRows = DB::table($table)->where('id', $id)->delete();

    if ($deletedRows > 0) {
        return redirect()->route('admin/photoslist')->with('success', 'Photos deleted successfully');
    } else {
        return redirect()->route('admin/photoslist')->with('error', 'Failed to delete photo');
    }
}
}
