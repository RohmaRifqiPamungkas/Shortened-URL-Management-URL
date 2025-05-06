<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Menampilkan semua kategori milik user untuk project tertentu
     */
    public function index(Request $request, $projectId)
    {
        $user = $request->user();

        $project = Project::find($projectId);

        if (!$project) {
            return response()->json(['error' => 'Project not found'], 404);
        }

        $categories = Category::where('user_id', $user->id)
            ->where('project_id', $projectId)
            ->get();

        return response()->json($categories);
    }

    /**
     * Menyimpan kategori baru
     */
    public function store(Request $request, $projectId)
    {
        $user = $request->user();

        // Cek apakah sedang membuat kategori baru saja
        if ($request->has('name') && $request->filled('name') && !$request->filled('original_url')) {
            // Validasi kategori baru
            $validated = $request->validate([
                'name' => 'required|string|max:255',
            ]);

            $project = Project::findOrFail($projectId);

            // Simpan kategori baru
            $category = Category::create([
                'user_id' => $user->id,
                'project_id' => $project->id,
                'name' => $validated['name'],
            ]);

            return response()->json([
                'message' => 'Kategori berhasil dibuat',
                'category' => $category,
            ]);
        }

        // Validasi dan simpan link
        $validated = $request->validate([
            'original_url' => 'required|url',
            'category_id' => 'required|exists:categories,id',
        ]);

        $link = Link::create([
            'user_id' => $user->id,
            'project_id' => $projectId,
            'category_id' => $validated['category_id'],
            'original_url' => $validated['original_url'],
        ]);

        return response()->json([
            'message' => 'Link berhasil disimpan',
            'link' => $link,
        ]);
    }
}