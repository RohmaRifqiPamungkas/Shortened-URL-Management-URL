<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'project_name',
        'project_slug',
        'is_active',
    ];

    protected $attributes = [
        'is_active' => true,
    ];

    public function categories()
    {
        return $this->hasMany(Category::class);
    }
    
    /**
     * Relasi: Project punya banyak link
     */
    public function links()
    {
        return $this->hasMany(Link::class, 'project_id');
    }

}