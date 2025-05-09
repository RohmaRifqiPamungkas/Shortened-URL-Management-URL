import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import axios from 'axios';

export default function Create({ auth, project }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState(''); // State untuk kategori baru

    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        links: [{ title: '', url: '' }],
    });

    useEffect(() => {
        axios
            .get(`/dashboard/projects/${project.id}/categories`)
            .then((response) => setCategories(response.data))
            .catch((error) => console.error('Gagal memuat kategori:', error));
    }, [project.id]);

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
        post(`/dashboard/projects/${project.id}/links`);
    };

    // Submit kategori baru
    const submitCategory = (e) => {
        e.preventDefault();
        // Ubah URL endpoint untuk menyimpan kategori baru
        axios
            .post(`/dashboard/projects/${project.id}/categories`, { name: newCategory }) // Perbaiki endpoint
            .then((response) => {
                setCategories([...categories, response.data.category]); // Menambahkan kategori baru ke dropdown
                setNewCategory(''); // Reset input kategori baru
            })
            .catch((error) => console.error('Gagal menambahkan kategori:', error));
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
                                {/* Form Input Kategori Baru */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Tambah Kategori Baru
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            className="mt-1 block w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                            placeholder="Nama Kategori"
                                        />
                                        <button
                                            type="button"
                                            onClick={submitCategory}
                                            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md"
                                        >
                                            Tambah
                                        </button>
                                    </div>
                                    {errors.newCategory && (
                                        <p className="mt-1 text-sm text-red-500">{errors.newCategory}</p>
                                    )}
                                </div>

                                {/* Dropdown Kategori */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Pilih Kategori
                                    </label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => {
                                            setSelectedCategory(e.target.value);
                                            setData('category_id', e.target.value);
                                        }}
                                        className="mt-1 block w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.category_id && (
                                        <p className="mt-1 text-sm text-red-500">{errors.category_id}</p>
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
                                                    onChange={(e) =>
                                                        handleLinkChange(index, 'title', e.target.value)
                                                    }
                                                    className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    type="url"
                                                    placeholder="URL Link"
                                                    value={link.url}
                                                    onChange={(e) =>
                                                        handleLinkChange(index, 'url', e.target.value)
                                                    }
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
