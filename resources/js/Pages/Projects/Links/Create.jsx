import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth, project }) {
    const { data, setData, post, processing, errors } = useForm({
        category_title: '',
        links: [{ title: '', url: '' }],
    });

    const handleLinkChange = (index, field, value) => {
        const updatedLinks = [...data.links];
        updatedLinks[index][field] = value;
        setData('links', updatedLinks);
    };

    const addLinkField = () => {
        setData('links', [...data.links, { title: '', url: '' }]);
    };

    const removeLinkField = (index) => {
        const updatedLinks = data.links.filter((_, i) => i !== index);
        setData('links', updatedLinks);
    };

    const submit = (e) => {
        e.preventDefault();
        post(`/dashboard/projects/${project.id}/links/create`);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Tambah Link ke: {project.project_name}
                </h2>
            }
        >
            <Head title="Tambah Link Baru" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 flex justify-between items-center text-gray-900 dark:text-gray-100">
                            <span>Tambah Link Baru</span>
                            <Link
                                href="/dashboard/projects"
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                            >
                                Kembali
                            </Link>
                        </div>

                        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                            <form onSubmit={submit} className="space-y-6">
                                {/* Input kategori */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Nama Kategori
                                    </label>
                                    <input
                                        type="text"
                                        value={data.category_title}
                                        onChange={(e) => setData('category_title', e.target.value)}
                                        className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        placeholder="Contoh: Sosial Media"
                                    />
                                    {errors.category_title && (
                                        <p className="mt-1 text-sm text-red-500">{errors.category_title}</p>
                                    )}
                                </div>

                                {/* Repeater Link */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Daftar Link
                                    </label>
                                    {data.links.map((link, index) => (
                                        <div key={index} className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                                            <div className="mb-2">
                                                <input
                                                    type="text"
                                                    placeholder="Judul Link"
                                                    value={link.title}
                                                    onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                                                    className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    type="url"
                                                    placeholder="URL Link"
                                                    value={link.url}
                                                    onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                                                    className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                                />
                                            </div>
                                            {data.links.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeLinkField(index)}
                                                    className="text-red-500 hover:underline text-sm"
                                                >
                                                    Hapus
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={addLinkField}
                                        className="text-blue-600 hover:underline mt-2"
                                    >
                                        + Tambah Link
                                    </button>

                                    {errors.links && (
                                        <p className="mt-1 text-sm text-red-500">{errors.links}</p>
                                    )}
                                </div>

                                {/* Tombol Submit */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
                                    >
                                        Simpan Link
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
