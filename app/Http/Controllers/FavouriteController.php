<?php

namespace App\Http\Controllers;

use App\Models\FavouriteWord;
use Illuminate\Http\Request;

class FavouriteController extends Controller
{
    public function storeFav(Request $request)
    {
        $favourite = [
            'english' => $request->english,
            'finnish' => $request->finnish,
            'example' => $request->example,
        ];
        $data = FavouriteWord::create($favourite);
        return;
    }
    public function getFav()
    {
        return FavouriteWord::all();
    }
}
