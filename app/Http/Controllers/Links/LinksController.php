<?php

namespace App\Http\Controllers\Links;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Links\Links;
use Illuminate\Http\Request;

class LinksController extends Controller
{
     public function index() {
        return view('jurse2023_admin.links.links');
    }
    public function index2() {
        return view('jurse2023.index');
    }
    public function index3() {
      return view('jurse2023.index-2');
    }
    public function create_link(Request $request)
    {
        // Validation rules can be adjusted based on your requirements
        $request->validate([
            'href' => 'required|string|max:255',
            'title' => 'required|string|max:255'
        ]);

       
        $links = new Links([
            'href' => $request->input('href'),
            'title' => $request->input('title')
        ]);

        // Save the program to the database
        $links->save();

        // Redirect or perform any other actions as needed
        return redirect()->route('admin/links')->with('success', 'Link created successfully');
    }
    public function get_all(Request $request)
    {
        $links = Links::all();
        return view('jurse2023_admin.links.linksList', ['links' => $links]);
    }
    public function getById( $id) {
        $table = 'links';
        $links = DB::table($table)->where('id',$id)->first();
        if( !$links){
            return redirect()->route('admin/links')->with('error', 'cannot found this link');
        }else {
            return redirect()->route('admin/links')->with('success',['links'=>$links] );
        }
    }
    public function getByName( $title) {
        $table = 'links';
        $links = DB::table($table)->where('title',$titl)->first();
        if( !$links){
            return redirect()->route('admin/links')->with('error', 'cannot found this link');
        }else {
            return redirect()->route('admin/links')->with('success',['links'=>$links] );
        }
    }
    public function updateLink($id, Request $request)
    {
        $table = 'links';

        // Get the existing speaker
        $links = DB::table($table)->where('id', $id)->first();

        // Validate other fields if needed
        $request->validate([
            'href' => 'required|string|max:255',
            'title' => 'required|string|max:255'
        ]);

        // Update other fields
        $affectedRows = DB::table($table)->where('id', $id)->update([
            'href' => $request->input('href'),
            'title' => $request->input('title')
        ]);

        if ($affectedRows > 0) {
            return redirect()->route('admin/linksList')->with('success', 'Link updated successfully');
        } else {
            return redirect()->route('admin/linksList')->with('error', 'Failed to update Link');
        }
    }
    public function deleteLink($id)
{
    $table = 'links';

    // Get the link record to delete
    $links = DB::table($table)->where('id', $id)->first();

    if (!$links) {
        return redirect()->route('admin/linksList')->with('error', 'Links not found');
    }

    // Delete the link record from the database
    $deletedRows = DB::table($table)->where('id', $id)->delete();

    if ($deletedRows > 0) {
        return redirect()->route('admin/linksList')->with('success', 'Link deleted successfully');
    } else {
        return redirect()->route('admin/linksList')->with('error', 'Failed to delete this Link');
    }
}
}
