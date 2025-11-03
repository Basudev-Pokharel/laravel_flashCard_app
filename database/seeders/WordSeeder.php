<?php

namespace Database\Seeders;

use App\Models\Word;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ["finnish" => "kissa", "english" => "cat", "example" => "Kissa on pehmeä."],
            ["finnish" => "koira", "english" => "dog", "example" => "Koira juoksee nopeasti."],
            ["finnish" => "talo", "english" => "house", "example" => "Talo on iso ja valkoinen."],
            ["finnish" => "auto", "english" => "car", "example" => "Auto on pysäköity kadulle."],
            ["finnish" => "koulu", "english" => "school", "example" => "Lapset menevät kouluun aamulla."],
            ["finnish" => "kirja", "english" => "book", "example" => "Luen mielenkiintoista kirjaa."],
            ["finnish" => "pöytä", "english" => "table", "example" => "Pöydällä on kukkia."],
            ["finnish" => "tuoli", "english" => "chair", "example" => "Tuoli on mukava."],
            ["finnish" => "vesi", "english" => "water", "example" => "Juo lasillinen vettä."],
            ["finnish" => "leipä", "english" => "bread", "example" => "Syön tuoretta leipää."],
            ["finnish" => "omena", "english" => "apple", "example" => "Omena on punainen."],
            ["finnish" => "maito", "english" => "milk", "example" => "Maito on kylmää."],
            ["finnish" => "aurinko", "english" => "sun", "example" => "Aurinko paistaa kirkkaasti."],
            ["finnish" => "kuu", "english" => "moon", "example" => "Kuu loistaa yöllä."],
            ["finnish" => "tähti", "english" => "star", "example" => "Taivas on täynnä tähtiä."],
            ["finnish" => "puu", "english" => "tree", "example" => "Puu kasvaa pihalla."],
            ["finnish" => "kukko", "english" => "rooster", "example" => "Kukko laulaa aamulla."],
            ["finnish" => "juna", "english" => "train", "example" => "Juna saapuu asemalle."],
            ["finnish" => "lentokone", "english" => "airplane", "example" => "Lentokone lentää korkealla."],
            ["finnish" => "meri", "english" => "sea", "example" => "Meri on sininen ja kaunis."]
        ];
        Word::insert($data);
    }
}
