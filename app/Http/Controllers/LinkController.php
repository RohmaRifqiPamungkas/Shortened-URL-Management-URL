<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Link;
use App\Models\Project;
use Illuminate\Http\Request;
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

        return Inertia::render('Projects/Links/Create', [
            'project' => $project,
        ]);
    }

    public function store(Request $request, Project $project): RedirectResponse
    {
        abort_if((int) $project->user_id !== (int) Auth::id(), 403);

        $validated = $request->validate([
            'category_title' => 'required|string|max:255',
            'links' => 'required|array|min:1',
            'links.*.title' => 'required|string|max:255',
            'links.*.url' => 'required|url',
        ]);

        $userId = Auth::id();

        // Simpan kategori baru
        $category = $project->categories()->create([
            'user_id' => $userId,
            'name' => $validated['category_title'],
        ]);

        // Simpan semua link dalam kategori tersebut
        foreach ($validated['links'] as $link) {
            $project->links()->create([
                'user_id' => $userId,
                'category_id' => $category->id,
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