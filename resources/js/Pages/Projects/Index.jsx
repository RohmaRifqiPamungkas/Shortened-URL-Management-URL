import React from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function ProjectsDashboard({ auth }) {
    const { projects = [], flash } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Projects Dashboard
                </h2>
            }
        >
            <Head title="Projects Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 flex justify-between items-center text-gray-900 dark:text-gray-100">
                            <span>
                                Total Projects:{" "}
                                {projects.length === 0
                                    ? "No projects yet"
                                    : projects.length}
                            </span>

                            <Link
                                href="/dashboard/projects/create"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Add Project
                            </Link>
                        </div>

                        {flash?.success && (
                            <div className="px-6 text-green-500">
                                {flash.success}
                            </div>
                        )}

                        <div className="overflow-x-auto px-6 pb-6">
                            <table className="min-w-full text-left text-sm text-gray-900 dark:text-white">
                                <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                                    <tr>
                                        <th className="px-4 py-2">#</th>
                                        <th className="px-4 py-2">Nama Project</th>
                                        <th className="px-4 py-2">Slug</th>
                                        <th className="px-4 py-2">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.length > 0 ? (
                                        projects.map((project, index) => (
                                            <tr
                                                key={project.id}
                                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                <td className="px-4 py-2">
                                                    {index + 1}
                                                </td>
                                                <td className="px-4 py-2 font-medium">
                                                    {project.project_name}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <a
                                                        href={`/m/${project.project_slug}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 dark:text-blue-400 underline"
                                                    >
                                                        {project.project_slug}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-2 flex gap-2">
                                                    <Link
                                                        href={`/dashboard/projects/${project.id}/links/create`}
                                                        className="text-green-500 hover:underline"
                                                    >
                                                        Add
                                                    </Link>

                                                    <Link
                                                        href={`/dashboard/projects/${project.id}/edit`}
                                                        className="text-yellow-500 hover:underline"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <form
                                                        method="POST"
                                                        action={`/dashboard/projects/${project.id}`}
                                                        onSubmit={(e) => {
                                                            if (
                                                                !confirm("Yakin ingin menghapus project ini?")
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        <input
                                                            type="hidden"
                                                            name="_method"
                                                            value="DELETE"
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="text-red-500 hover:underline"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </form>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                                            >
                                                Belum ada proyek yang tersedia.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
