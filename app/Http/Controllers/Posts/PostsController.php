<?php

namespace App\Http\Controllers\Posts;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Posts\Posts;
use Illuminate\Http\Request;

class PostsController extends Controller
{
     public function index() {
        return view('jurse2023_admin.posts.posts');
    }
    public function create_post(Request $request)
    {
        // Validation rules can be adjusted based on your requirements
        $request->validate([
            'link' => 'required|string|max:255',
            'datetweet' => 'required|date',
        ]);

        $posts = new Posts([
            'link' => $request->input('link'),
            'datetweet' => $request->input('datetweet')
        ]);

        // Save the program to the database
        $posts->save();

        // Redirect or perform any other actions as needed
        return redirect()->route('admin/posts')->with('success', 'Post created successfully');
    }
    public function get_all(Request $request)
    {
        $posts = Posts::all();
        return view('jurse2023_admin.posts.postsList', ['posts' => $posts]);
    }
    public function getById( $id) {
        $table = 'posts';
        $posts = DB::table($table)->where('id',$id)->first();
        if( !$posts){
            return redirect()->route('admin/posts')->with('error', 'cannot found this post');
        }else {
            return redirect()->route('admin/posts')->with('success',['posts'=>$posts] );
        }
    }
    public function updatePost($id, Request $request)
    {
        $table = 'posts';

        // Get the existing speaker
        $links = DB::table($table)->where('id', $id)->first();

        // Validate other fields if needed
        $request->validate([
            'link' => 'required|string|max:255',
            'datetweet' => 'required|date'
        ]);

        // Update other fields
        $affectedRows = DB::table($table)->where('id', $id)->update([
            'link' => $request->input('link'),
            'datetweet' => $request->input('datetweet')
        ]);

        if ($affectedRows > 0) {
            return redirect()->route('admin/postsList')->with('success', 'Posts updated successfully');
        } else {
            return redirect()->route('admin/postsList')->with('error', 'Failed to update Post');
        }
    }
    public function deletePost($id)
{
    $table = 'posts';

    // Get the link record to delete
    $posts = DB::table($table)->where('id', $id)->first();

    if (!$posts) {
        return redirect()->route('admin/postsList')->with('error', 'Posts not found');
    }

    // Delete the link record from the database
    $deletedRows = DB::table($table)->where('id', $id)->delete();

    if ($deletedRows > 0) {
        return redirect()->route('admin/postsList')->with('success', 'Post deleted successfully');
    } else {
        return redirect()->route('admin/postsList')->with('error', 'Failed to delete this Post');
    }
}
}
