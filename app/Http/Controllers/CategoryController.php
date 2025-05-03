<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Menampilkan semua kategori milik user untuk project tertentu
     */
    public function index(Request $request, $projectId)
    {
        $user = $request->user();

        $categories = Category::where('user_id', $user->id)
            ->where('project_id', $projectId)
            ->get();

        return response()->json($categories);
    }

    /**
     * Menyimpan kategori baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'project_id' => 'required|exists:projects,project_id',
        ]);

        $category = Category::create([
            'user_id' => $request->user()->id,
            'project_id' => $validated['project_id'],
            'name' => $validated['name'],
        ]);

        return response()->json([
            'message' => 'Kategori berhasil dibuat',
            'category' => $category,
        ]);
    }
}