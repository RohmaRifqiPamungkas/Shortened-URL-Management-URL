import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, project, links, categories }) {
    // Kelompokkan links berdasarkan kategori
    const groupedLinks = categories.reduce((acc, category) => {
        acc[category.name] = {
            category_id: category.id,
            links: links.filter(link => link.category?.id === category.id)
        };
        return acc;
    }, {});
    

    // Tambahkan kategori 'Tanpa Kategori' (link yang tidak punya kategori)
    const uncategorizedLinks = links.filter(link => !link.category);
    if (uncategorizedLinks.length > 0) {
        groupedLinks['Tanpa Kategori'] = {
            category_id: null,
            links: uncategorizedLinks,
        };
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Kategori untuk: {project.project_name}
                </h2>
            }
        >
            <Head title={`Daftar Kategori - ${project.project_name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 flex justify-between items-center text-gray-900 dark:text-gray-100">
                            <span>Daftar Kategori</span>
                            <div className="space-x-2">
                                <Link
                                    href="/dashboard/projects"
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                >
                                    Kembali
                                </Link>
                                <Link
                                    href={`/dashboard/projects/${project.id}/categories/create`}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Tambah Kategori
                                </Link>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                            {categories.length === 0 ? (
                                <p className="italic text-gray-500">Belum ada kategori yang tersedia.</p>
                            ) : (
                                <ul className="space-y-6">
                                    {Object.entries(groupedLinks).map(([categoryName, data]) => (
                                        <li
                                            key={categoryName}
                                            className="p-4 border rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="font-semibold text-lg">{categoryName}</h3>
                                                <Link
                                                    href={`/dashboard/projects/${project.id}/links/create?category_id=${data.category_id}`}
                                                    className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                >
                                                    Add Link
                                                </Link>
                                            </div>

                                            {data.links.length > 0 ? (
                                                <ul className="list-disc ml-5 space-y-1">
                                                    {data.links.map(link => (
                                                        <li key={link.id}>
                                                            <a
                                                                href={link.original_url}
                                                                className="text-blue-500 hover:underline"
                                                                target="_blank"
                                                            >
                                                                {link.title}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-sm italic text-gray-400">Belum ada link dalam kategori ini.</p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
