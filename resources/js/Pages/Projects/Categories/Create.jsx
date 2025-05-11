import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

export default function Create({ auth, project }) {
    const [newCategory, setNewCategory] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const submitCategory = (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        axios.post(`/dashboard/projects/${project.id}/categories`, { name: newCategory })
            .then((response) => {
                setMessage('Kategori berhasil ditambahkan!');
                setNewCategory('');
            })
            .catch((error) => {
                setError('Gagal menambahkan kategori.');
                console.error('Gagal menambahkan kategori:', error);
            });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Tambah Kategori untuk: {project.project_name}
                </h2>
            }
        >
            <Head title="Tambah Kategori" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 flex justify-between items-center text-gray-900 dark:text-gray-100">
                            <span>Form Tambah Kategori</span>
                            <Link
                                href={`/dashboard/projects/${project.id}/links`}
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                            >
                                Kembali
                            </Link>
                        </div>

                        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                            <form onSubmit={submitCategory} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Nama Kategori
                                    </label>
                                    <input
                                        type="text"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                        placeholder="Contoh: Sosial Media"
                                    />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                                    >
                                        Tambah Kategori
                                    </button>
                                </div>

                                {message && <p className="text-green-500">{message}</p>}
                                {error && <p className="text-red-500">{error}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
