import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, project, links }) {
    // Group links by category name
    const groupedLinks = links.reduce((acc, link) => {
        const categoryName = link.category?.name || 'Tanpa Kategori';
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(link);
        return acc;
    }, {});

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Link untuk: {project.project_name}
                </h2>
            }
        >
            <Head title={`Daftar Link - ${project.project_name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 flex justify-between items-center text-gray-900 dark:text-gray-100">
                            <span>Daftar Link</span>
                            <Link
                                href="/dashboard/projects"
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                            >
                                Kembali
                            </Link>
                        </div>

                        <div className="p-6 border-t border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                            {links.length === 0 ? (
                                <p>Belum ada link.</p>
                            ) : (
                                <ul className="space-y-6">
                                    {Object.entries(groupedLinks).map(([categoryName, grouped]) => (
                                        <li
                                            key={categoryName}
                                            className="p-4 border rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                                        >
                                            <h3 className="font-semibold text-lg mb-2">{categoryName}</h3>
                                            <ul className="space-y-1 list-disc list-inside">
                                                {grouped.map(link => (
                                                    <li key={link.link_id}>
                                                        <span className="font-medium">{link.title}: </span>
                                                        <a
                                                            href={link.original_url}
                                                            className="text-blue-600 dark:text-blue-400 underline break-words"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            {link.original_url}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
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
