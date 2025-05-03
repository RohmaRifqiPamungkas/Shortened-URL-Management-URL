import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        project_name: "",
        project_slug: "",
    });

    function submit(e) {
        e.preventDefault();
        post("/dashboard/projects");
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Buat Project Baru
                </h2>
            }
        >
            <Head title="Buat Project" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 flex justify-between items-center text-gray-900 dark:text-gray-100">
                            <span>Tambah Project Baru</span>

                            <Link
                                href="/dashboard/projects"
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                            >
                                Kembali
                            </Link>
                        </div>

                        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="project_name"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Nama Project
                                    </label>
                                    <input
                                        type="text"
                                        id="project_name"
                                        name="project_name"
                                        value={data.project_name}
                                        onChange={(e) =>
                                            setData("project_name", e.target.value)
                                        }
                                        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                                            errors.project_name ? "border-red-500" : ""
                                        }`}
                                        placeholder="Masukkan nama project"
                                    />
                                    {errors.project_name && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.project_name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="project_slug"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Slug Project
                                    </label>
                                    <input
                                        type="text"
                                        id="project_slug"
                                        name="project_slug"
                                        value={data.project_slug}
                                        onChange={(e) =>
                                            setData("project_slug", e.target.value)
                                        }
                                        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                                            errors.project_slug ? "border-red-500" : ""
                                        }`}
                                        placeholder="Contoh: portfolio-ku"
                                    />
                                    {errors.project_slug && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.project_slug}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
                                    >
                                        Simpan Project
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
