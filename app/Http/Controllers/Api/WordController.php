<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Word;
use Illuminate\Http\Request;

class WordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Word::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'finnish' => 'required|string|max:255',
            'english' => 'required|string|max:50',
            'example' => 'string',
        ]);

        $store = Word::create($validated);
        return response()->json($store, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Word::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $fetchRow = Word::findOrFail($id);
        $validated = $request->validate([
            'finnish' => 'required|string|max:255',
            'english' => 'required|string|max:50',
            'example' => 'string',
        ]);

        $fetchRow->update($validated);
        return response()->json($fetchRow);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $getIdColumn = Word::findOrFail($id);
        $getIdColumn->delete();
        return response()->json(null, 204);
    }
}
