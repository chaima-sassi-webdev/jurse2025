<?php

namespace App\Http\Controllers\Sponsors; // Corrected namespace
use App\Http\Controllers\Controller;
use App\Models\Sponsors\Sponsors;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class SponsorController extends Controller
{
    public function index()
    {
        return view('jurse2023_admin.sponsors.sponsors');
    }
    public function index2()
    {
       $sponsors = Sponsors::all();
        return view('jurse2023_admin.sponsors.sponsorsList', ['sponsors' => $sponsors]);
    }
public function sponsors() {

         $sponsors = Sponsors::orderBy('order')->get();
        return view('jurse2023.sponsors', compact('sponsors'));
    }
    public function storeSponsor(Request $request)
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
            $image->move(public_path('images/sponsors'), $imageName);
            $newData['src'] = 'images/sponsors/' . $imageName;
        }

        // Create a new Speakers instance
        $sponsors = new Sponsors([
            'alt' => $request->input('alt'),
            'order' => $request->input('order'),
            'src' => $request->input('src'),
        ]);

        // Save the image path to the database
        $sponsors->src = 'images/sponsors/' . $imageName;

        // Save the speaker to the database
        $sponsors->save();

        // Redirect or perform any other actions as needed
        return redirect()->route('admin/createSponsor')->with('success', 'Sponsor created successfully'); // Adjusted route name
    }
    public function updateSponsor($id, Request $request)
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

public function deleteSponsor($id)
{
    $table = 'sponsors';

    // Get the speaker record to delete
    $sponsors = DB::table($table)->where('id', $id)->first();

    if (!$sponsors) {
        return redirect()->route('admin/sponsorsList')->with('error', 'Sponsor not found');
    }

    // Delete the associated image file if it exists
    if (file_exists(public_path($sponsors->src))) {
        unlink(public_path($sponsors->src));
    }

    // Delete the speaker record from the database
    $deletedRows = DB::table($table)->where('id', $id)->delete();

    if ($deletedRows > 0) {
        return redirect()->route('admin/sponsorslist')->with('success', 'Sponsor deleted successfully');
    } else {
        return redirect()->route('admin/sponsorslist')->with('error', 'Failed to delete sponsor');
    }
}
}
