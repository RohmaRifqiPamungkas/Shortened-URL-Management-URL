<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Project;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class LinkController extends Controller
{
    public function index($project_id): Response
    {
        $project = Project::where('id', $project_id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $links = Link::with('category')
            ->where('project_id', $project_id)
            ->get();

        return Inertia::render('Projects/Links/Index', [
            'project' => $project,
            'links' => $links,
        ]);
    }

    public function create(Project $project): Response
    {
        abort_if($project->user_id !== Auth::id(), 403);

        $categories = Category::where('user_id', Auth::id())
            ->where('project_id', $project->id)
            ->get();

        return Inertia::render('Projects/Links/Create', [
            'project' => $project,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request, Project $project): RedirectResponse
    {
        abort_if((int) $project->user_id !== (int) Auth::id(), 403);

        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'category_title' => 'nullable|string|max:255',
            'links' => 'required|array|min:1',
            'links.*.title' => 'required|string|max:255',
            'links.*.url' => 'required|url',
        ]);

        $userId = Auth::id();

        // Validasi tambahan: pastikan salah satu diisi
        if (empty($validated['category_id']) && empty($validated['category_title'])) {
            return back()->withErrors([
                'category_title' => 'Pilih kategori dari dropdown atau masukkan kategori baru.',
            ])->withInput();
        }

        // Tentukan kategori ID
        $categoryId = $validated['category_id'] ?? null;

        // Jika tidak pilih dari dropdown, buat kategori baru
        if (!$categoryId && !empty($validated['category_title'])) {
            $category = $project->categories()->create([
                'user_id' => $userId,
                'name' => $validated['category_title'],
            ]);
            $categoryId = $category->id;
        }

        // Simpan semua link dengan kategori
        foreach ($validated['links'] as $link) {
            $project->links()->create([
                'user_id' => $userId,
                'category_id' => $categoryId,
                'title' => $link['title'],
                'original_url' => $link['url'],
            ]);
        }

        return redirect()
            ->route('projects.links.index', $project->id)
            ->with('success', 'Kategori dan link berhasil ditambahkan.');
    }

    public function destroy(Link $link): RedirectResponse
    {
        if ($link->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        $project_id = $link->project_id;
        $link->delete();

        return redirect()
            ->route('projects.links.index', $project_id)
            ->with('success', 'Link berhasil dihapus.');
    }
}