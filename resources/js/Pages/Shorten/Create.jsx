import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        original_url: "",
        custom_alias: "",
        expires_at: "",
    });

    function submit(e) {
        e.preventDefault();
        post("/dashboard/shorten");
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Buat Short Link Baru
                </h2>
            }
        >
            <Head title="Buat Short Link" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 flex justify-between items-center text-gray-900 dark:text-gray-100">
                            <span>Tambah Short Link Baru</span>

                            <Link
                                href="/dashboard/shortends"
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                            >
                                Kembali
                            </Link>
                        </div>

                        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="original_url"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Link Asli (Original URL)
                                    </label>
                                    <input
                                        type="url"
                                        id="original_url"
                                        name="original_url"
                                        value={data.original_url}
                                        onChange={(e) =>
                                            setData("original_url", e.target.value)
                                        }
                                        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${errors.original_url ? "border-red-500" : ""
                                            }`}
                                        placeholder="https://contoh.com/artikel"
                                        required
                                    />
                                    {errors.original_url && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.original_url}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="custom_alias"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Custom Short Code (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        id="custom_alias"
                                        name="custom_alias"
                                        value={data.custom_alias}
                                        onChange={(e) =>
                                            setData("custom_alias", e.target.value)
                                        }
                                        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${errors.custom_alias ? "border-red-500" : ""
                                            }`}
                                        placeholder="misal: promo-mei"
                                    />
                                    {errors.custom_alias && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.custom_alias}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="expires_at"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Tanggal Kadaluarsa (Opsional)
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="expires_at"
                                        name="expires_at"
                                        value={data.expires_at}
                                        onChange={(e) =>
                                            setData("expires_at", e.target.value)
                                        }
                                        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${errors.expires_at ? "border-red-500" : ""
                                            }`}
                                    />
                                    {errors.expires_at && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.expires_at}
                                        </p>
                                    )}
                                </div>

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
