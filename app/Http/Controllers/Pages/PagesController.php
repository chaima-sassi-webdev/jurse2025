<?php

namespace App\Http\Controllers\Pages;
use App\Http\Controllers\Controller;
use App\Models\Pages\Pages; 

use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function index()
    {
        return view('jurse2023_admin.pages.pages');
    }

    public function create()
    {
        return view('jurse2023_admin.pages.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        Page::create($request->all());

        return redirect()->route('pages.index')->with('success', 'Page created successfully');
    }

    public function show(Page $page)
    {
        return view('pages.show', compact('page'));
    }

    public function edit(Page $page)
    {
        return view('pages.edit', compact('page'));
    }

    public function update(Request $request, Page $page)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $page->update($request->all());

        return redirect()->route('pages.index')->with('success', 'Page updated successfully');
    }

    public function destroy(Page $page)
    {
        $page->delete();

        return redirect()->route('pages.index')->with('success', 'Page deleted successfully');
    }
}
